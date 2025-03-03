const mongoose= require('mongoose')

// const appointmentSchema= new mongoose.Schema({

// })

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

    phoneNumber:{
        type: Number,
    },

    Age:{
        type:Number,
    },

    sex:{
        type: String,
    },

    weight:{
        type: Number,
    },

    height:{
        type: Number,
    },

    address:{
        type: String,
    },

    appointment:{
        type:[appointmentSchema],
        default:[],
    }


})

const User= mongoose.model("User",userSchema)
module.exports= User