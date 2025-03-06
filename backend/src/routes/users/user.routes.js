const express= require('express')
const router=express.Router()

const { handleSignUpUser }= require("../../controllers/users/signup.controller.js")
const { handleLoginUser }= require("../../controllers/users/login.controller.js")

router
.route("/signup")
.post(handleSignUpUser)
router
.route("/login")
.post(handleLoginUser)

module.exports=router