// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

// Initialization
const app = express();

// Middlewares & Rendering Engine
app.use(express.static('public'));
app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(
  cookieSession({
    name: 'session',
    keys: ['test'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Mongoose Connection
mongoose.connect(
  'mongodb+srv://test:aKirfaxU4b4VBRez@cluster0-you6g.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Models
require('./models/User');

// Routes
app.get('/', (req, res) => {
  if (!req.session.user) res.redirect('/login');

  res.render('home', { user: req.session.user.username });
});

app.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');

  return res.render('index');
});

app.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/');

  return res.render('register');
});

app.get('/logout', (req, res) => {
  req.session.user = null;

  return res.redirect('/login');
});

app.post('/login', async (req, res) => {
  const User = mongoose.model('User');

  const user = await User.findOne({ email: req.body.email });

  console.log(req.body.email);

  if (!user)
    return res.json({
      msg: 'email-err',
    });

  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordMatched)
    return res.json({
      msg: 'pass-err',
    });

  req.session.user = user;

  return res.json({
    msg: 'success',
  });
});

app.post('/register', async (req, res) => {
  const User = mongoose.model('User');

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  }).save();

  return res.json({
    msg: 'success',
  });
});

// Listening
app.listen(8080);
