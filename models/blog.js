const mongoose = require('mongoose');
const { stringify } = require('uuid');
const Schema = mongoose.Schema;

const blog = new Schema({
    title: {
        type: String,
        trim:true
    },

    heading:[String],
    paragraph:[String],
    subParagraph:[String],

    blogImages:{
        image:{
            type:String,
            trim:true
        },
        _id:false,
    },



},{timestamps:true});


module.exports = mongoose.model('blog',blog);