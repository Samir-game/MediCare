const mongoose= require('mongoose')
const DB_NAME= require('../constant.js')

async function connectionDB(){
    try {
        const result= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Connected to MongoDB ",result.connection.host)

    } catch (error) {
        console.log("Error connecting to MongoDB")
        process.exit(1)
    }
}

module.exports={
    connectionDB,
}