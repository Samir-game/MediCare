const jwt= require('jsonwebtoken')

function generateJWT(user){
    return jwt.sign(
        {
            _id:user._id,
            userName:user.userName,
            email:user.email,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

module.exports={
    generateJWT,
}