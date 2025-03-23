const { generateHospitalJWT } = require('../middlewares/generateJWT.js');
const Hospital= require('../models/hospital.model.js')
const bcrypt= require('bcryptjs')

async function handleHospitalRegister(req,res){
    const{
        hospitalName,
        hospitalEmail,
        hospitalPassword,
        hospitalAddress,
        hospitalContact,
        hospitalCity,
        hospitalPinCode
        }= req.body;

    if(
        !hospitalName || !hospitalEmail || !hospitalPassword || !hospitalAddress
        || !hospitalContact || !hospitalCity || !hospitalPinCode
    ){
        return res.status(400).json({
            msg:"fill all the credentials"
        })
    }

    try {
        const existingHospital= await Hospital.findOne({hospitalEmail:hospitalEmail})
        if(existingHospital){
            return res.status(400).json({
                msg:"Hospital with this email already exist"
            })
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(hospitalPassword, saltRounds);

        const newHospital= await Hospital.create({
            hospitalName,
            hospitalEmail,
            hospitalContact,
            hospitalAddress,
            hospitalCity,
            hospitalPinCode,
            hospitalPassword: hashPassword            
        })

        const hospitalToken= generateHospitalJWT(newHospital);

        return res.status(201).json({
            msg:"hospital registered",
            hospitalName,
            hospitalEmail,
            hospitalToken,
        })
  
    } catch (error) {
        console.log("error registering the hospital",error)
        return res.stauts(500).json({
            msg:"internal server error"
        })
    }
    
}

async function handleHospitalLogin(req,res){
    const {hospitalEmail, hospitalPassword}= req.body;
    if(!hospitalEmail || !hospitalPassword){
        return res.status(400).json({
            msg:"fill all the credentials"
        })
    }

    try {
        const hospital= await Hospital.findOne({hospitalEmail: hospitalEmail})
        if(!hospital){
            return res.status(404).json({
                msg:"hospital not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(hospitalPassword, hospital.hospitalPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                 msg: "Invalid credentials"
            });
        }

        const hospitalToken= generateHospitalJWT(hospital);

        return res.status(200).json({
            msg:"loggin in successfully",
            hospitalName: hospital.hospitalName,
            hospitalEmail: hospitalEmail,
            hospitalToken,
        })

    } catch (error) {
        console.log("error logging in the hospital")
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleHospitalRegister,
    handleHospitalLogin
}