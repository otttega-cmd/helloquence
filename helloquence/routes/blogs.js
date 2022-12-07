const express = require('express');
const router = express.Router();

const BlogModel = require('../models/blog_model');

router.get('/', (req, res, next) => {
    res.send("These Are Blog Posts")
})

router.post('/blogs', (req, res) => {

    console.log(req.body);
    console.log(req.params);
})
module.exports=router;