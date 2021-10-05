const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');

const profil = require('./routes/profil');
const editProfil = require('./routes/user/edit');
const deleteProfil = require('./routes/user/delete');

const shopIndex = require('./routes/shop/index');

const admin = require('./routes/admin/index');

const adminProduct = require('./routes/admin/productCrud/index');
const adminAddProduct = require('./routes/admin/productCrud/create');
const adminUpdateProduct = require('./routes/admin/productCrud/update');
const adminDeleteProduct = require('./routes/admin/productCrud/delete');

const adminCategory = require('./routes/admin/categoryCrud/index');
const adminAddCategory = require('./routes/admin/categoryCrud/create');
const adminUpdateCategory = require('./routes/admin/categoryCrud/update');
const adminDeleteCategory = require('./routes/admin/categoryCrud/delete');

const adminUser = require('./routes/admin/userCrud/index');
const adminEditUser = require('./routes/admin/userCrud/edit');
const adminAddUser = require('./routes/admin/userCrud/add');
const adminDeleteUser = require('./routes/admin/userCrud/delete');

const isAuth = require('./middleware/isAuth');
const isAdmin = require('./middleware/isAdmin');

// Connexion MongoDB
const host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

mongoose.connect(`mongodb://${host}:${db_port}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

const app = express();

// template
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

// middlewares
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(express.json());

// Message flash and session
app.use(cookieParser('myapp'));
app.use(session({
  secret: 'myapp',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  },
}));
app.use(flash());

// Pour ajouter les informations de l'user dans la view
app.use((req, res, next) => {
  // ajouter la variable locals dans EJS (pour savoir si l'utilisateur est log)
  res.locals._user = req.session.user;
  next();
});

// Images upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use('/public', express.static('public'));

// routes
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', isAuth, logout);

app.use('/profil', isAuth, profil);
app.use('/profil/edit', isAuth, editProfil);
app.use('/profil/delete', isAuth, deleteProfil);

app.use('/boutique', isAuth, shopIndex);

app.use('/admin', isAuth, isAdmin, admin);

app.use('/admin/product', isAuth, isAdmin, adminProduct);
app.use('/admin/product/add', isAuth, isAdmin, upload.single('file'), adminAddProduct);
app.use('/admin/product/edit', isAuth, isAdmin, upload.single('file'), adminUpdateProduct);
app.use('/admin/product/delete', isAuth, isAdmin, adminDeleteProduct);

app.use('/admin/category', isAuth, isAdmin, adminCategory);
app.use('/admin/category/add', isAuth, isAdmin, adminAddCategory);
app.use('/admin/category/edit', isAuth, isAdmin, adminUpdateCategory);
app.use('/admin/category/delete', isAuth, isAdmin, adminDeleteCategory);

app.use('/admin/user', isAuth, isAdmin, adminUser);
app.use('/admin/user/add', isAuth, isAdmin, adminAddUser);
app.use('/admin/user/edit', isAuth, isAdmin, adminEditUser);
app.use('/admin/user/delete', isAuth, isAdmin, adminDeleteUser);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));