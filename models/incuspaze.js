const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncuspazeSchema = new Schema({
    officeName:{
        type:String,
        trim:true,
    },
    officeAddress:{
        buildingName:{
            type:String,
            trim:true,
        },
        floor:{
            type:String,
            trim:true,
        },
        near:{
            type:String,
            trim:true,
        },
        officeSubHeading:{
            type:String,
            trim:true,
        },
        streetName:{
            type:String,
            trim:true,
        },
        city:{
            type:String,
            trim:true,
        },
        state:{
            type:String,
            trim:true,
        },
        pincode:{
            type:Number,
        },
        country:{
            type:String,
            trim:true,
        },
        Link:{
            type:String,
            trim:true,
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
    
    amenity:[{
        amenityName:{
            type:String,
            trim:true,
            _id:false,
        },
        _id:false,
        
    }],
    officeImage:[{
        cover:{
            type:String,
            trim:true,
        },
        _id:false,
    }],
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
            type:Number,
            _id:false,
        },
        priceForTime:{
            type:String,
            trim:true,
            enum:['hour','day','month','year','week','quarter','Hour','Day','Month','Year','Week','Quarter'],
            default:'day',
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