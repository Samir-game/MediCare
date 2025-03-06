const jwt= require('jsonwebtoken');
const User= require('../models/user.model.js');

async function verifyJWT(req,res,next){
    try {
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ 
                msg:'No token found, please login first' 
            });
        }

        const token= authHeader.split(' ')[1];
        const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET);

        const user= await User.findById(decodedToken._id);
        if(!user){
            return res.status(403).json({ 
                msg: 'Invalid token'
            });
        }

        req.user= user;
        next();

    } catch(error) {
        console.error('Error verifying JWT:',error);
        return res.status(403).json({ 
            msg: 'Invalid or expired token'
        });
    }
}

module.exports={ 
    verifyJWT
};
