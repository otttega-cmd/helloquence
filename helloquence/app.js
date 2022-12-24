const express = require('express');
//Declare App
const app = express();

// import middleware
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Auth middleware
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const session =require('express-session');


// Configure dotenv
require('dotenv').config();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Up Mongoose Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true });

// Get The Default Connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// import models
const blogModel = require('./models/blog_model');
const authorModel = require('./models/author_model');
const blogInstanceModel = require ('./models/blog_instance_model');
const userModel = require('./models/user_model');



// import routers from routes
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
const { time } = require('console');



// use imported middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// app.use(passport.initialize()); //Initialize passport middleware
// app.use(passport.session()); //Use session middleware

// // Use Sessions
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60 * 60 * 100 } //1 hour

// }));



//use imported routers (specify path here, router here, write handler in route file)
app.use('/', indexRouter);
// app.use('/blogs', blogsRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
