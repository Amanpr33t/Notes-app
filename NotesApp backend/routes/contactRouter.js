const express= require('express')
const router= express.Router()
const contact= require('../controllers/contact')
const {authenticateUser,authorizePermissions}=require('../middleware/authentications')

router.post('/',contact)

module.exports= router