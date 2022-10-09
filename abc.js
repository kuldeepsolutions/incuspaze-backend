// var createError = require("http-errors");
// var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var cors = require('cors');
// var logger = require("morgan");
// var multer = require("multer");

// var dbCon = require("./lib/db");

// var usersRouter = require("./routes/user");
// var feedbackRouter = require("./routes/feedBack");
// var roomRouter = require("./routes/room");
// var rtcAndRtmTokenRouter = require("./routes/rtcAndRtmToken");
// var recodingRouter = require("./routes/recoding");

// var app = express();
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
//   next();
// });

// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().any());
// app.use(cookieParser());
// app.use(cors());

// // Request Logger
// if (app.get("env") === "development") {
//   app.use(logger("dev"));
// }

// app.use("/user", usersRouter);
// app.use("/feedback", feedbackRouter);
// app.use("/room", roomRouter);
// app.use("/token", rtcAndRtmTokenRouter);
// app.use("/recording", recodingRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
// });

// module.exports = app;



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncuspazeSchema = new Schema({
    officeName:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    officeAddress:{
        buildingName:{
            type:String,
            trim:true,
            lowercase:true
        },
        floor:{
            type:String,
            trim:true,
        },
        near:{
            type:String,
            trim:true,
            lowercase:true
        },
        officeSubHeading:{
            type:String,
            trim:true,
        },
        streetName:{
            type:String,
            trim:true,
            lowercase:true
        },
        city:{
            type:String,
            trim:true,
            lowercase:true
        },
        state:{
            type:String,
            trim:true,
            lowercase:true
        },
        pincode:{
            type:String,
            trim:true
        },
        country:{
            type:String,
            trim:true,
            lowercase:true,
            default:"India"
        },
        distance:{ 
            busStopDistance:{
                type:String,
                trim:true,
            },
            metroStationDistance:{
            type:String,
            trim:true,
            },
            railwayStationDistance:{
                type:String,
                trim:true,
            },
            airportDistance:{
                type:String,
                trim:true,
            },
        }
       
    },
    officeContact:{
        type:String,
        trim:true,
        max:10,
    },
    
    amenity:[String],
    officeImage:[String],
    addressImageLink:{
        type:String,
        trim:true,
    },
    officeDescription:{
        type:String,
        trim:true,
    },
    officeSpaces:[String],
    officeRooms:[{
        roomName:{
            type:String,
            trim:true,
            _id:false,
        },
        // roomImage:[{
        //     type:String,
        // trim:true,
        // // }],
        price:{
            type:String,
            _id:false,
        },
        
        priceForTime:{
            type:String,
            trim:true,
            default:'day',
            enum:['hour','day','month','year','week','quarter','Hour','Day','Month','Year','Week','Quarter'],
            
            _id:false,
        },
        roomDescription:{
            type:String,
            trim:true,
            _id:false,
        },
        _id:false,

    }]



},{timestamps:true});

module.exports = mongoose.model('location',IncuspazeSchema);