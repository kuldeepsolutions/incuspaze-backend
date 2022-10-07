const inquiry = require('../controllers/inquiry');
const express = require("express");
const multer = require("multer");
const router = express.Router();

router.post("/inquire", inquiry.sendMailToUser);

module.exports = router;