const job = require("../models/job");

exports.post_job = async (req,res)=>{
    
    const jobRequest = req.body;
    const jobData = await jobModel.create(jobRequest);

    res.status(201).send({message:"job posted successfully",data:jobData})
}

exports.job_edit = async (req,res)=>{
    const editRequest = req.body;
    
    const updatedPlace = await jobModel.findOne({_id:editRequest.jobId});
   updatedPlace.jobLocation
    const newValue =updatedPlace.jobLocation.filter(item => !editRequest.jobLocation.includes(item));
    console.log(newValue)
    const response = await jobModel.findOneAndUpdate({_id:editRequest.jobId},{jobLocation : newValue},{ upsert: true, new: true });

    return res.status(201).send({message:"job updated successfully",data:response})
}

exports.close_job= async (req,res)=>{
    try{
       await jobModel.findOneAndUpdate({_id:req.body.jobId},{status:true},{new:true});

       return res.status(200).send({message:"job closed successfully"});
    }catch(err){
        return res.status(500).send(err.message)
    }
}