var createError = require("http-errors");
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service");
const uuid = require("uuid").v4;
const app = express();


app.use(bodyParser.json({parameterLimit:100000,limit:"10mb"}));
app.use(bodyParser.urlencoded({extended:true,parameterLimit:100000,limit:"10mb"})); 

// calling the routes
const routes = require("./routes/incuspaze");
app.use("/location", routes);

// Inquiry
const inquiry = require("./routes/inquiry");
app.use("/inquiry", inquiry);


// Blog
const blog = require("./routes/blog");
app.use("/blog", blog);

// Job
const job = require("./routes/job");
app.use("/job", job);




app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "file is too large",
        });
      }
  
      if (error.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "File limit reached",
        });
      }
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "File must be an image or video",
        });
      }
    }
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
    next();
});


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(multer().any());
// app.use(cors());
// const cors = require('cors');
app.use(cors({
    origin: '*'
}));
// Connect to Database
const db = require("./config/db");





if (app.get("env") === "development") {
    app.use(logger("dev"));
}


app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });

  module.exports = app;








// var createError = require("http-errors");
// var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var cors = require('cors');
// var logger = require("morgan");
// var multer = require("multer");

// var dbCon = require("./config/db");




// const routes = require("./routes/incuspaze");
// const inquiry = require("./routes/inquiry");
// const blog = require("./routes/blog");







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



// // calling the routes
// app.use("/location", routes);

// // Inquiry
// app.use("/inquiry", inquiry);


// // Blog
// app.use("/blog", blog);



// // Request Logger
// if (app.get("env") === "development") {
//   app.use(logger("dev"));
// }

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