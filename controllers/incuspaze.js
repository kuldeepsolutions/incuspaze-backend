const Incuspaze = require('../models/incuspaze');
require("dotenv").config();
// const express = require("express");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3,s3UploadSingle } = require("../s3Service");
const uuid = require("uuid").v4;
// const app = express();

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






exports.createLocation =async (req, res) => {
    try {
        const uploadFile = upload.array("file", 20);
        uploadFile(req, res, async (err) => {
            // console.log(req.body);
            // console.log(req.files);
            // let data1= req.files
            // console.log(data1);
            // get all files original name from data1
        //     let data2 = data1.map((file) => file.originalname);
        //     console.log(data2);

        //     // https://meta-unite-server.s3.ap-south-1.amazonaws.com/incuspaze/Co-working-space-in-lucknow.jpg
        //    let convertToUrl = (data2) => {
        //         let data3 = data2.map((file) => {
        //             return `https://meta-unite-server.s3.ap-south-1.amazonaws.com/incuspaze/${file}`;
        //         });
        //         return data3;
        //     };
        //     // console.log(convertToUrl(data2));
        //     const data = convertToUrl(data2);
        //     console.log(data);
            // convert data array values to [{cover:data[i]}]
            // let data4 = data.map((file) => {
            //     return { cover: file };
            // });
            // const file = req.files[0];
            // console.log(file);
            let data = req.files;
            let result =[]
            for(let i=0;i<data.length;i++){
                let file = data[i];
                let fileUrl = await s3UploadSingle(file);
               result.push(fileUrl);
               console.log(fileUrl);
            }
            const result2  = await s3UploadSingle(req.files[0]);
            console.log('-----\n\n'+result2);
            // console.log(result);


         
            const results = await uploadFile(data);
             
            // console.log(results);



            
            // console.log(results);
          

            const location = await Incuspaze.create({
                buildingName: req.body.buildingName,
                description: req.body.description,
                location: req.body.location,
                // officeImag:data4,
                // video: results.Location,
            });
            if (!location || !results) {
                return res.status(400).json({
                    status: "fail",
                    message: "Location not created",
                    err: err
                });
            }
            



            res.status(201).json({
                status: "success",
                data: {
                    location,
                    // results
                }
            });
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
};