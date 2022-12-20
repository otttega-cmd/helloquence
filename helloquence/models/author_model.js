const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
    // To avoid errors in cases where an author does not have either a last name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let full_name = "";
    if (this.first_name && this.last_name) {
      full_name = `${this.first_name} ${this.last_name}`;
    }
    if (!this.first_name || !this.last_name) {
      full_name = "";
    }
    return full_name;
  });


// Virtual for author's URL
    AuthorSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/author/${this._id}`;
  });


  module.exports = mongoose.model("Author", AuthorSchema);