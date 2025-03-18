const dotenv= require('dotenv')
const {connectionDB}= require('./database/db.js')
const app= require('./app.js')

dotenv.config({
    path:'./env'
})

connectionDB()
.then(()=>{
    console.log("Connection to MongoDB sunccessfull")
    app.listen(process.env.PORT || 8001,()=>{
        console.log("Server started at port: ",process.env.PORT || 8001)
    })
})
.catch((error)=>{
    console.log("Failed to connected MongoDB",error)
})
