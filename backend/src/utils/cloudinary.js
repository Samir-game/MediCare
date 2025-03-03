const cloudinary= require('cloudinary').v2;
const fs= require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadToCloudinary(localFilePath){

    if(!localFilePath){
        return res.status(500).json({
            msg:"could not find localFilePath of file"
        })
    }

    try {
        const result= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        fs.unlinkSync(localFilePath)
        console.log("cloudinary result: ",result)
        return result
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Failed to upload on Cloudinary",error)
    }
}

module.exports={
    uploadToCloudinary,
}