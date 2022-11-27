const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    publication_time: Date,
    published: { type: Boolean, default: false },
    read_count: Number,
    reading_time: Number,
    tags: String,
  })


  module.exports = mongoose.model("BlogModel", BlogSchema);