const Blog = require("../models/blog_model");
const Author = require("../models/author_model");
const BlogInstance = require("../models/blog_instance_model");

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
