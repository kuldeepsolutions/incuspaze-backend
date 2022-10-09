const blog = require('../controllers/blog');
const express = require('express');
const router = express.Router();


router.post('/createBlog',blog.createBlog);



module.exports = router;