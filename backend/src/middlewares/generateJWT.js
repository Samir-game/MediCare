const jwt= require('jsonwebtoken')


function generateUserJWT(user){
    return jwt.sign(
        {
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    )
}
function generateHospitalJWT(hospital){
    return jwt.sign(
        {
            _id: hospital._id,
            hospitalName: hospital.hospitalName,
            hospitalEmail: hospital.hospitalEmail
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    )
}
module.exports={
    generateUserJWT,
    generateHospitalJWT,
}