const incuspaze = require('../controllers/incuspaze');
require("dotenv").config();
const express = require("express");
const multer = require("multer");
// const { s3Uploadv2, s3Uploadv3 } = require("../s3Service");
const uuid = require("uuid").v4;
const router = express.Router();




router.post("/create", incuspaze.createLocation);

router.get("/getOfficeName/:city", incuspaze.getOfficeByCityName);

router.get("/getOfficeByStreetName", incuspaze.getOfficeByStreetName);

router.get("/getOfficeBySpaceName", incuspaze.getOfficeBySpace);

router.get("/queryFilter", incuspaze.queryFilter);

module.exports = router;



/* 


{
    "status": "success",
    "data": {
        "location": {
            "officeName": "\"Shilp Zaveri\"",
            "officeAddress": {
                "buildingName": "Shilp Zaveri",
                "floor": "3rd Floor ,Shilp Zaveri",
                "near": "Shyamal Cross Rd",
                "officeSubHeading": "Managed office and Coworking Space in Shilp Zaveri",
                "streetName": "Shyamal",
                "city": "Ahmedabad",
                "state": "Gujarat",
                "pincode": 380015,
                "country": "India",
                "Link": "Shilp Zavery",
                "distance": {
                    "busStopDistance": "2.5 KM",
                    "metroStationDistance": "",
                    "railwayStationDistance": "4.1 KM"
                }
            },
            "officeContact": "9930662621",
            "amenity": [
                {
                    "amenityName": "Reception"
                },
                {
                    "amenityName": "Lounge"
                },
                {
                    "amenityName": "High Speed Internet"
                },
                {
                    "amenityName": "IT support"
                },
                {
                    "amenityName": "Conference Room"
                },
                {
                    "amenityName": "Daily Cleaning"
                },
                {
                    "amenityName": "Cafeteria & Pantry"
                },
                {
                    "amenityName": "Community Manager"
                }
            ],
            "officeImage": [
                {
                    "cover": "https://meta-unite-server.s3.ap-south-1.amazonaws.com/incuspaze/coworking space in Incuspaze-Shilp-Zaveri-Ahmedabad.jpeg"
                }
            ],
            "addressImageLink": "\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7344.470718295467!2d72.531942!3d23.015129!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x981f0105922fa5b3!2sIncuspaze%20-%20Shilp%20Zaveri!5e0!3m2!1sen!2sin!4v1665125440424!5m2!1sen!2sin\"",
            "officeDescription": "",
            "officeSpaces": [
                "Office Space",
                "Meeting Room",
                "Conference Room"
            ],
            "officeRooms": [
                {
                    "roomName": "Managed Office Space",
                    "price": "0",
                    "priceForTime": "hour"
                }
            ],
            "_id": "63414baef82bcf3a7afe4f05",
            "createdAt": "2022-10-08T10:06:38.458Z",
            "updatedAt": "2022-10-08T10:06:38.458Z",
            "__v": 0
        }
    }
}




*/