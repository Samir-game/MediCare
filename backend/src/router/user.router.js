const express= require('express')
const router= express.Router()
const {userSignup, userLogin}= require('../controllers/user.controller.js')

router
.route("/signup")
.post(userSignup)

router
.route("/login")
.post(userLogin)

module.exports= router