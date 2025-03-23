const mongoose= require('mongoose')

const hospitalSchema= new mongoose.Schema({
    hospitalName:{
        type: String,
        required: true,
    },

    hospitalEmail:{
        type: String,
        required: true,
        unique: true,
    },

    hospitalPassword:{
        type: String,
        required: true,
    },

    hospitalAddress:{
        type: String,
        required: true,
    },

    hospitalContact:{
        type: String,
        required: true,
    },
    
    hospitalCity:{
        type: String,
        required: true,
    },
 
    hospitalPinCode:{
        type: String,
        required: true,
    },

})

const Hospital= mongoose.model("Hospital",hospitalSchema)
module.exports= Hospital