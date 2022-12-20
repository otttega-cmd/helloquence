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




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Up Mongoose Connection
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://admin:simplepassword@helloquencecluster.7pnhlwy.mongodb.net/helloquence?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser:true, useUnifiedTopology:true });

// Get The Default Connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// import models
const Blog = require('./models/blog_model');
const Author = require('./models/author_model');
const BlogInstance = require ('./models/blog_instance_model')



// import routers from routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var blogsRouter = require('./routes/blogs');
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




//use imported routers (specify path here, router here, write handler in route file)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/cool', usersRouter);
// app.use('/blogs', blogsRouter);
app.use('/catalog', catalogRouter);


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
