const express= require('express')
const app= express();
const cors= require('cors')
const userRouter= require("./routes/users/user.routes.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/api/user",userRouter)



module.exports=app;