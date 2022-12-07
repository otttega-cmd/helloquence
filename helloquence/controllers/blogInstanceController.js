const BlogInstance = require("../models/blog_instance_model");

// Display list of all BlogInstances.
exports.bloginstance_list = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance list");
};

// Display detail page for a specific BlogInstance.
exports.bloginstance_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
};

// Display BlogInstance create form on GET.
exports.bloginstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BlogInstance create on POST.
exports.bloginstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

// Display BlogInstance delete form on GET.
exports.bloginstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BlogInstance delete on POST.
exports.bloginstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BlogInstance update form on GET.
exports.bloginstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bloginstance update on POST.
exports.bloginstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
