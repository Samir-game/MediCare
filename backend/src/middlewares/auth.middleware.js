const jwt= require('jsonwebtoken')
const Hospital= require('../models/hospital.model.js')

async function authMiddleware(req,res,next){
    try {
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                msg:"no token found.Please login first"
            })
        }
    
        const token=authHeader.split(' ')[1];
        const decodeToken= jwt.verify(token,process.env.JWT_SECRET);
    
        const hospital= await Hospital.findById(decodeToken._id);
        if(!hospital){
            return res.status(403).json({
                msg:"invalid token"
            })
        }
    
        req.hospital=hospital;
        next();
    } catch (error) {
        console.log("error verifying jwt",error)
        return res.status(403).json({
            msg:"invalid or expired token"
        })
    }
}

module.exports={
    authMiddleware
}
