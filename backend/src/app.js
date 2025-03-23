const express= require('express')
const app= express()
const userRouter= require('./router/user.router.js')
const hospitalRouter= require('./router/hospital.router.js')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/user",userRouter)
app.use("/api/hospital",hospitalRouter)

module.exports=app;