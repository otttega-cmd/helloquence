const Blog = require("../models/blog_model");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all blogs.
exports.blog_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Book list");
};

// Display detail page for a specific blog.
exports.blog_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display blog create form on GET.
exports.blog_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle blog create on POST.
exports.blog_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display blog delete form on GET.
exports.blog_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle blog delete on POST.
exports.blog_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display blog update form on GET.
exports.blog_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle blog update on POST.
exports.blog_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
