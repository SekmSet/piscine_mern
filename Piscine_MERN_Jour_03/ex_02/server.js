const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const profil = require('./routes/profil');
const isAuth = require('./middleware/isAuth');

// Connexion MongoDB
const host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

mongoose.connect(`mongodb://${host}:${db_port}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
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
  res.locals.user = req.session.user;
  next();
});

// routes
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', isAuth, logout);
app.use('/profil', isAuth, profil);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));