const blog = require('../controllers/blog');
const express = require('express');
const router = express.Router();


router.post('/createBlog',blog.createBlog);
router.get('/getBlog',blog.getBlogs);
router.get('/getBlogById',blog.getBlogById);



module.exports = router;