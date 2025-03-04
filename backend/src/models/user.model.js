const mongoose= require('mongoose')

const appointmentSchema= new mongoose.Schema({
    patientName:{
        type: String,
        required: true,
    },

    appointmentTime:{
        type: String,
        required: true,
    },

    bloodGroup:{
        type: String,
        required: true,
    },

    userProblem:{
        type: String,
        required: true,
    },

    phoneNumber:{
        type: String,
        required: true,
    },

    Age:{
        type:Number,
        required: true,
    },

    sex:{
        type: String,
        required: true,
    },

    weight:{
        type: Number,
        required: true,
    },

    height:{
        type: Number,
        required: true,
    },
},{timestamps: true})

const userSchema= new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        unique: true,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    profilePhoto:{
        type:String,
    },

    address:{
        type: String,
    },

    appointment:{
        type:[appointmentSchema],
        default:[],
    }

},{timestamps: true})

const User= mongoose.model("User",userSchema)
module.exports= User