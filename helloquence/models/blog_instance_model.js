const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogInstanceSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true }, // reference to the associated blog
  status: {
    type: String,
    required: true,
    enum: ["Draft", "Published"],
    default: "Draft",
  }
});

// Virtual for blog instance's URL
BlogInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bloginstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("BlogInstance", BlogInstanceSchema);
