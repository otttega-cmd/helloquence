const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author'},
    publication_time: { type: Date, required: true },
    state: { type: String, enum: ["draft", "published"], required: true, default: "draft" },
    read_count: { type: Number, default: 0 },
    reading_time: { type: Number, default: 0 },
    // tags: [{ type: String, required: false }]
  });

  // Virtual for book's URL
  BlogSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/blog/${this._id}`;
});



  module.exports = mongoose.model("Blog", BlogSchema);