const blog = require('../models/blog');
const {s3Uploadv3} = require('../s3Service');
const uuid = require('uuid').v4;
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image" || "video") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000000, files: 20 }, //limit of uploading file is 20 for now at once , if wanna increase just change the number 20 to what you want.
});


exports.createBlog = async (req, res) => {
    try {
        const uploadFile = upload.array("file", 20);
        uploadFile(req, res, async (err) => {
            if(err){
                console.log(err);
            }
            console.log(req.body);
            const result = await s3Uploadv3(req.files);
            

            
            res.status(200).json({
              message: "success",
              result
            });
        });
    } catch (error) {
        res.status(500).json({ 
            message:"Internal Server Error",
            error:error.message
          });
    }
};