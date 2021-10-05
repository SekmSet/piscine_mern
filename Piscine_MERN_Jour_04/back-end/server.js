const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const home = require('./routes/home');
const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const users = require('./routes/user/index');
const blog = require('./routes/blog/index');

const authenticateJWT = require('./middleware/authenticateJWT');

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

// middlewares
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(express.json());
app.use(cors());

// routes
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/users/', authenticateJWT, users);
app.use('/', authenticateJWT, blog);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));