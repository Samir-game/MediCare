const User= require("../../models/user.model.js")
const bcrypt= require('bcryptjs')
const {generateJWT}= require("../../middleware/generateJWT.js")

async function handleLoginUser(req,res){
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(401).json({
            msg:"fill all the fields"
        })
    }

    try {
        const user= await User.findOne({email: email})
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }

        const validatePassword= await bcrypt.compare(password,user.password)
        if(!validatePassword){
            return res.status(401).json({
                msg:"incorrect password"
            })
        }

        const token= await generateJWT(user)

        return res.status(200).json({
            msg:"login successful",
            token: token,
            userName: user.userName,
            email: user.email,
        })

    } catch (error) {
        console.log("user login unsuccessfull",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleLoginUser,
}