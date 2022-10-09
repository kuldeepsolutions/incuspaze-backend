const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true,
        trim:true
    },
    jobProfile:{
        type:String,
        required:true,
        trim:true
    },
    jobLocation:[String],
    requiredExperience:{
        from:{
            type:String,
            trim:true
        },
        to:{
            type:String,
            trim:true
        }
    },
    jobDescription:{
        type:String,
        trim:true
    },
    jobResponsibilities:{
        type:String,
        trim:true
    },
    jobRequirements:{
        type:String,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


module.exports = mongoose.model("job", jobSchema);