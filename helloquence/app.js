const express = require('express');
//Declare App
const app = express();

// import middleware
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Set Up Mongoose Connection
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser:true, useUnifiedTopology:true });

// Get The Default Connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const AuthorSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
})

const BlogSchema = new Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  publication_time: Date,
  blog_state: { type: Boolean, default: false },
  read_count: Number,
  reading_time: Number,
  tags: String,
})


// import routers from routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');
const { time } = require('console');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// use imported middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//use imported routers (specify path here, router here, write handler in route file)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/cool', usersRouter);
app.use('/blogs/', blogsRouter);


const new_blog = mongoose.model ('New Blog', BlogSchema)

const testBlog = new new_blog({
  title: 'A New Blog',
  description: 'A new blog description',
  body: 'A New Body description',
  author: 'John Doe',
  publication_time: Date.now(),
  blog_state: { type: Boolean, default: false },
  read_count: 12,
  reading_time: 5,
  tags: 'new'
});

testBlog.save(function (err){
  if(err) return err;
});

console.log(testBlog);
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
