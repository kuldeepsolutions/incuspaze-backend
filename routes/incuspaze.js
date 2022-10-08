const incuspaze = require('../controllers/incuspaze');
require("dotenv").config();
const express = require("express");
const multer = require("multer");
// const { s3Uploadv2, s3Uploadv3 } = require("../s3Service");
const uuid = require("uuid").v4;
const router = express.Router();




router.post("/create", incuspaze.createLocation);
router.get("/getOfficeName", incuspaze.getOfficeByCityName);

module.exports = router;