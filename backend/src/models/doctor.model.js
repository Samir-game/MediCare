const mongoose= require('mongoose')

const doctorSchema= new mongoose.Schema({
    doctorName:{
        type: String,
        required: true,
    },

    doctorPhoneNumber:{
        type: String,
        require: true,
    },

    doctorSpecialisation:{
        type: String,
        required: true,
    },

    doctorExperience:{
        type: String,
        required: true,
    },

    doctorQualification:{
        type: String,
        required: true,
    },

    workingInHospital:{  
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Hospital", 
        required: true,
    },
})

const Doctor= mongoose.model("Doctor",doctorSchema)
module.exports=Doctor