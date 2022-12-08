const mongoose = require("mongoose");

const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogInstanceSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true }, // reference to the associated blog
  status: {
    type: String,
    required: true,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  due_for_revision : { type: Date, default: Date.now() },
});

// Virtual for blog instance's URL
BlogInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bloginstance/${this._id}`;
});

// Virtual for formatted date with Luxon
BlogInstanceSchema.virtual("due_for_revision_formatted").get(function () {
  return DateTime.fromJSDate(this.due_for_revision).toLocaleString(DateTime.DATE_MED);
})

// Export model
module.exports = mongoose.model("BlogInstance", BlogInstanceSchema);
