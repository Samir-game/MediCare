const bcrypt= require('bcryptjs')
const User= require("../../models/user.model.js")

async function handleSignUpUser(req,res){
    const {userName,email,password}= req.body;
    if(!userName || !email || !password){
        return res.status(401).json({
            msg:"Fill all the fields"
        })
    }

    try {

        const existingUser= await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({
                msg:"user already exist with this email"
            })
        }

        const saltRounds=10;
        const hashPassword= await bcrypt.hash(password,saltRounds)

        const user= await User.create({
            userName,
            email,
            password:hashPassword,
        })
        
        return res.status(200).json({
            msg:"user created successfully",
            user
        })

    } catch (error) {
        console.log("error signing up user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleSignUpUser,
}