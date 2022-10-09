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