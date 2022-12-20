const Blog = require("../models/blog_model");
const Author = require("../models/author_model");
const BlogInstance = require("../models/blog_instance_model");

const { body, validationResult } = require("express-validator");


const async = require("async");

exports.index = (req, res) => {

  // async.parallel runs all the async functions at the same time because they don't depend on values from preceding functions
  async.parallel(
    {
      // Count the Blog Model for every blog (an empty object, specific parameters can be passed to search for specific value)
      blog_count(callback) {
        Blog.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      blog_instance_count(callback) {
        BlogInstance.countDocuments({}, callback);
      },
      blog_instance_published_count(callback) {
        BlogInstance.countDocuments({ status: "published" }, callback);
      },
      author_count(callback) {
        Author.countDocuments({}, callback);
      }
    },
    (err, results) => {
      res.render("index", {
        title: "Helloquence",
        error: err,
        data: results,
      })
      ;
    }
  );
};

// Display list of all blogs.
exports.blog_list = function (req, res, next) {
  Blog.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec(function (err, list_blogs) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("blog_list", { title: "Blog List", blog_list: list_blogs });
    });
};

// Display detail page for a specific blog.
exports.blog_detail = (req, res) => {
  async.parallel(
    {
      blog(callback) {
        Blog.findById(req.params.id)
          .populate("author")
          .populate("description")
          .exec(callback);
      },
      blog_instance(callback) {
        BlogInstance.find({ blog: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.blog == null) {
        // No results.
        const err = new Error("Blog not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("blog_detail", {
        title: results.blog.title,
        blog: results.blog,
        blog_instances: results.blog_instance,
      });
    }
  );
};


// Display blog create form on GET.
exports.blog_create_get = (req, res, next) => {
  async.parallel(
    {
      authors(callback){
        Author.find(callback);
      }

    }, (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("blog_form",{
        title: "Create Blog",
        authors: results.authors
      })
    }
  )
};

 // Handle blog create on POST.
exports.blog_create_post = [

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      author: req.body.author,
      publication_time: Date.now(),
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          authors(callback) {
            Author.find(callback);
          }
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("blog_form", {
            title: "Create Blog",
            authors: results.authors,
            blog,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Save book.
    blog.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new book record.
      res.redirect(blog.url);
    });
  },
];


// Display blog delete form on GET.
exports.blog_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle blog delete on POST.
exports.blog_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display blog update form on GET.
exports.blog_update_get = (req, res, next) => {
  // Get book, authors and genres for form.
  async.parallel(
    {
      blog(callback) {
        Blog.findById(req.params.id)
          .populate("author")
          .exec(callback);
      },
      authors(callback) {
        Author.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.blog == null) {
        // No results.
        const err = new Error("Blog not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("blog_form", {
        title: "Update Blog",
        authors: results.authors,
        blog: results.blog,
      });
    }
  );
};


// Handle blog update on POST.
exports.blog_update_post = [

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Blog object with escaped/trimmed data and old id.
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      author: req.body.author,
      publication_time: req.body.publication_time,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          authors(callback) {
            Author.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("blog_form", {
            title: "Update Blog",
            authors: results.authors,
            blog,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Update the record.
    Blog.findByIdAndUpdate(req.params.id, blog, {}, (err, theblog) => {
      if (err) {
        return next(err);
      }

      // Successful: redirect to book detail page.
      res.redirect(theblog.url);
    });
  },
];

