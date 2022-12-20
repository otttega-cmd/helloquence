const BlogInstance = require("../models/blog_instance_model");
const Blog = require("../models/blog_model");

const { body, validationResult } = require("express-validator");

// Display list of all BlogInstances.
exports.bloginstance_list = function (req, res) {
  BlogInstance.find()
    .populate("blog")
    .exec(function (err, list_bloginstances) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("bloginstance_list", {
        title: "Blog Instance List",
        bloginstance_list: list_bloginstances,
      });
    });


};

// Display detail page for a specific BookInstance.
exports.bloginstance_detail = (req, res, next) => {
  BlogInstance.findById(req.params.id)
    .populate("blog")
    .exec((err, bloginstance) => {
      if (err) {
        return next(err);
      }
      if (bloginstance == null) {
        // No results.
        const err = new Error("Blog copy not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("bloginstance_detail", {
        title: `Copy: ${bloginstance.blog.title}`,
        bloginstance,
      });
    });
};


// Display BlogInstance create form on GET.
exports.bloginstance_create_get = (req, res, next) => {
  Blog.find({}, "title").exec((err, blogs) => {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render("bloginstance_form", {
      title: "Create BlogInstance",
      blog_list: blogs,
    });
  });
};


// Handle BlogInstance create on POST.
exports.bloginstance_create_post = [
  // Validate and sanitize fields.
  body("blog", "Blog must be specified").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("due_for_revision", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bloginstance = new BlogInstance({
      blog: req.body.blog,
      status: req.body.status,
      due_for_revision: req.body.due_for_revision,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Blog.find({}, "title").exec(function (err, blogs) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("bloginstance_form", {
          title: "Create BlogInstance",
          blog_list: blogs,
          selected_blog: bloginstance.blog._id,
          errors: errors.array(),
          bloginstance,
        });
      });
      return;
    }

    // Data from form is valid.
    bloginstance.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new record.
      res.redirect(bloginstance.url);
    });
  },
];


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
