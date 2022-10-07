const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncuspazeSchema = new Schema({
    officeName:{
        type:String,
    },
    officeAddress:{
        buildingName:{
            type:String,
        },
        floor:{
            type:String,
        },
        near:{
            type:String,
        },
        officeSubHeading:{
            type:String,
        },
        streetName:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        pincode:{
            type:Number,
        },
        country:{
            type:String,
        },
        Link:{
            type:String,
        },
       
        distance:{ 
            busStopDistance:{
                type:String,
            },
            metroStationDistance:{
            type:String,
            },
            railwayStationDistance:{
                type:String,
            },
            airportDistance:{
                type:String,
            },
        }
       
    },
    officeContact:{
        type:String,
        max:10,
    },
    officeEmail:{
        type:String,
    },
    amenity:[{
        amenityName:{
            type:String,
        },
        // amenityImage:{
        //     type:String,
        // }
    }],
    officeImage:[{
        cover:{
            type:String,
        }
    }],
    officeDescription:{
        type:String,
    },
    officeSpaces:[String],
    officeRooms:[{
        roomName:{
            type:String,
        },
        // roomImage:[{
        //     type:String,
        // }],
        price:{
            type:Number,
        },
        priceForTime:{
            type:String,
            enum:['hour','day','month','year','week','quarter','Hour','Day','Month','Year','Week','Quarter'],
            default:'day'
        },
        roomDescription:{
            type:String,
        },

    }]



},{timestamps:true});

module.exports = mongoose.model('Incuspaze',IncuspazeSchema);