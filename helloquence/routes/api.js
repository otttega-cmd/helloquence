const express = require("express");
const router = express.Router();

// Require controller modules.
const blog_controller = require("../controllers/blogController");
const author_controller = require("../controllers/authorController");
const blog_instance_controller = require("../controllers/blogInstanceController");
const search_controller = require("../controllers/searchController");

/// BLOG ROUTES ///

// GET catalog home page.
router.get("/", blog_controller.index);

// GET request for creating a Blog. NOTE This must come before routes that display Blog (uses id).
router.get("/blog/create", blog_controller.blog_create_get);

// POST request for creating Blog
router.post("/blog/create", blog_controller.blog_create_post);

// GET request to delete Blog.
router.get("/blog/:id/delete", blog_controller.blog_delete_get);

// POST request to delete Blog.
router.post("/blog/:id/delete", blog_controller.blog_delete_post);

// GET request to update Blog.
router.get("/blog/:id/update", blog_controller.blog_update_get);

// POST request to update Blog.
router.post("/blog/:id/update", blog_controller.blog_update_post);

// GET request for one Blog.
router.get("/blog/:id", blog_controller.blog_detail);

// GET request for list of all Blog items.
router.get("/blogs", blog_controller.blog_list);

/// USER ROUTES ///

// GET request for creating User. NOTE This must come before route for id (i.e. display author).
router.get("/user/create", author_controller.author_create_get);

// POST request for creating User.
router.post("/user/create", author_controller.author_create_post);

// GET request for logging in user
router.get("/user/login", author_controller.author_login_get);

// POST request for logging in users
router.get("/user/login", author_controller.author_login_post);


// GET request to delete Author.
router.get("/author/:id/delete", author_controller.author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", author_controller.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", author_controller.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", author_controller.author_update_post);

// GET request for one Author.
router.get("/user/:id", author_controller.author_detail);

// GET request for list of all Authors.
router.get("/authors", author_controller.author_list);


/// BLOGINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/bloginstance/create",
  blog_instance_controller.bloginstance_create_get
);
 
// POST request for creating BookInstance.
router.post(
  "/bloginstance/create",
  blog_instance_controller.bloginstance_create_post
);

// GET request to delete BookInstance.
router.get(
  "/bloginstance/:id/delete",
  blog_instance_controller.bloginstance_delete_get
);

// POST request to delete BookInstance.
router.post(
  "/bloginstance/:id/delete",
  blog_instance_controller.bloginstance_delete_post
);

// GET request to update BlogInstance.
router.get(
  "/bloginstance/:id/update",
  blog_instance_controller.bloginstance_update_get
);

// POST request to update BlogInstance.
router.post(
  "/bloginstance/:id/update",
  blog_instance_controller.bloginstance_update_post
);

// GET request for one BlogInstance.
router.get("/bloginstance/:id", blog_instance_controller.bloginstance_detail);

// GET request for list of all BlogInstance.
router.get("/bloginstances", blog_instance_controller.bloginstance_list);



// Search Queries
router.get("/search", search_controller.search_get)

module.exports = router;
