const mongoose= require("mongoose")

const hospitalSchema= new mongoose.Schema({
    hospitalName:{
        type: String,
        required: true,
    },

    hospitalAddress:{
        type: String,
        required: true,
    },

    hospitalPhoneNumber:{
        type: String,
        required: true,
    },
    
    city:{
        type: String,
        required: true,
    },
 
    pinCode:{
        type: String,
        required: true,
    },
},{timestamps: true})

const Hospital= mongoose.model("Hospital",hospitalSchema)
module.exports=Hospital