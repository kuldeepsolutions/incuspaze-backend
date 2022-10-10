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
            let data1= req.files
            // console.log(data1);
            // get all files original name from data1
            let data2 = data1.map((file) => file.originalname);
            console.log(data2);

     
           let convertToUrl = (data2) => {
                let data3 = data2.map((file) => {
                    return `https://meta-unite-server.s3.ap-south-1.amazonaws.com/incuspaze/${file}`;
                });
                return data3;
            };
            const data = convertToUrl(data2);
            let data4 = data.map((file) => {
                return {image:file};
            });
            
      
         
            const result = await s3Uploadv3(data);
            let {title,heading,paragraph,subParagraph} = req.body;

            const blogData = await blog.create({

                title:title,
                heading:heading,
                paragraph:paragraph,
                subParagraph:subParagraph,
                blogImages:data4
            });



          
            res.status(200).json({
              message: "success",
              data: blogData,
            });
        });
    } catch (error) {
        res.status(500).json({ 
            message:"Internal Server Error",
            error:error.message
          });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json({
            message:"success",
            data:blogs
        })
    } catch (error) {
        res.status(500).json({ 
            message:"Internal Server Error",
            error:error.message
          });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blogData = await blog.findById(req.body.id);
        res.status(200).json({
            message:"success",
            data:blogData
        })
    } catch (error) {
        res.status(500).json({ 
            message:"Internal Server Error",
            error:error.message
          });
    }
};