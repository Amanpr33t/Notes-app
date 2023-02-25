const express= require('express')
const router= express.Router()
const {signup,login,logout,changePassword,deleteUser,verifyEmail,setForgotPassword,forgotPassword,getAllUsers}= require('../controllers/user')

const {authenticateUser,authorizePermissions}=require('../middleware/authentications')

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',authenticateUser,logout)
router.patch('/changePassword',authenticateUser,changePassword)
router.delete('/deleteUser',authenticateUser,deleteUser)
router.patch('/verifyEmail',verifyEmail)
router.patch('/forgotPassword',forgotPassword)
router.patch('/setForgotPassword',authenticateUser,setForgotPassword)
router.get('/getAllUsers',authenticateUser,authorizePermissions,getAllUsers)


module.exports= router