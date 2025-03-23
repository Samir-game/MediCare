const express= require('express')
const router= express.Router()
const {handleHospitalRegister,handleHospitalLogin}= require('../controllers/hospital.controller.js')

router
.route("/register")
.post(handleHospitalRegister)

router
.route("/login")
.post(handleHospitalLogin)

module.exports= router