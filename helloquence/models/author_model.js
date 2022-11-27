const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
  });
  


  module.exports = mongoose.model("AuthorModel", AuthorSchema);