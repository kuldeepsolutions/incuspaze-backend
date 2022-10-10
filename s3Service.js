const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `incuspaze/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  // ${uuid()}-
  const data =await Promise.all(params.map((param) => s3.upload(param).promise()));
  console.log(data);
  return data
};

exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `incuspaze/${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param)))
  );
};

// Uploading single file
exports.s3UploadSingle = async (file) => {
  const s3client = new S3Client();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
  }
  return await s3client.send(new PutObjectCommand(params));
};

exports.uploadFile = async (file) => {
  try {
      let s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // process.env.ACCESS
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `addImage/${file.originalname}`, // HERE    "pk_newFolder/harry-potter.png" pk_newFolder/harry-potter.png
        Body: file.buffer,
      };
     return s3.upload(params).promise();

  //    var params =files.map((file) => {
  //     return{
  //     Bucket: process.env.AWS_BUCKET_NAME,
  //     Key: `addImage/${uuid()}-${file.originalname}`, // HERE    "pk_newFolder/harry-potter.png" pk_newFolder/harry-potter.png
  //     Body: file.buffer,
  //     };
  //   })
  //  return await Promise.all(params.map((param)=> s3.upload(params).promise()));
  } catch (err) {
    console.log(err.message);
  }
};


