const Doctor= require('../models/doctor.model.js') 
const Hospital= require('../models/hospital.model.js')

async function handleAddDoctor(req,res){
    const{
        doctorName,
        doctorEmail,
        doctorPhoneNumber,
        doctorSpecialisation,
        doctorExperience,
        doctorQualification
    }=req.body;

    if( !doctorName || 
        !doctorEmail ||
        !doctorPhoneNumber || 
        !doctorSpecialisation || 
        !doctorExperience ||
        !doctorQualification){
            return res.status(400).json({
                msg:"fill all the credentials"
            })
    }

    try {
        const exisitngDoctor= await Doctor.findOne({doctorEmail: doctorEmail})
        if(exisitngDoctor){
            return res.status(400).json({
                msg:"this doctor already exist"
            })
        }

        const hospital= req.hospital;
        if(!hospital){
            return res.status(403).json({
                msg:"unauthorized. Hospital information not found"
            })
        }

        const newDoctor= await Doctor.create({
            doctorName,
            doctorEmail,
            doctorPhoneNumber,
            doctorSpecialisation,
            doctorExperience,
            doctorQualification,
            workingInHospital: hospital._id,
        })

        return res.status(201).json({
            msg:"doctor registered",
            doctorName,
            doctorEmail,
            workingInHospital
        })

    } catch (error) {
        console.log("error registring doctor")
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

async function handleGetAllDoctors(req,res){
    try {
        const hospitalId= req.params;
        const allAllDoctors= await Doctor.find({workingInHospital:hospitalId});

        if(!allAllDoctors){
            return res.status(400).json({
                msg:"error getting all doctors"
            })
        }

        return res.status(200).json({
            allAllDoctors,
        })
        
    } catch (error) {
        console.log("error getting doctors");
        res.status(500).json({
            msg:"internal server error"
        })
    }
}



module.exports={
    handleAddDoctor,
    handleGetAllDoctors,
}