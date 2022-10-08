require("dotenv").config();
// const express = require("express");
const multer = require("multer");
const { s3Uploadv2, s3Uploadv3,s3UploadSingle } = require("../s3Service");
const uuid = require("uuid").v4;
// const app = express();

const Incuspaze = require('../models/incuspaze');
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
                return { cover: file };
            });
            
      
         
            const results = await s3Uploadv3(data);
            let {officeName,officeAddress,officeContact,amenity,officeDescription,officeSpaces,officeRooms} = req.body;
         
            officeAddress=  JSON.parse(officeAddress);
            amenity =   JSON.parse(amenity);
            officeSpaces = JSON.parse(officeSpaces);
            officeRooms = JSON.parse(officeRooms);
           
            console.log(officeAddress,"---",amenity,"---",officeSpaces,"---",officeRooms);


            const location = await Incuspaze.create({
                officeName:officeName,
                officeAddress:officeAddress,
                officeContact:officeContact,
                amenity:amenity,
                officeDescription:officeDescription,
                officeSpaces:officeSpaces,
                officeRooms:officeRooms,
                officeImage:data4,
            });


            if ( !results) {
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


exports.getOfficeByCityName = async (req, res) => {
    try {
        const city = req.body.city;
        const office = await Incuspaze.find({ "officeAddress.city": city },{_id:0,__v:0});
        if (!office) {
            return res.status(400).json({
                status: "fail",
                message: "No office found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                office,
            }
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
};