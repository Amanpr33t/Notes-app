const User= require('../models/user')
const jwt= require('jsonwebtoken')
const CustomAPIError= require('../errors/custom-error')
require('dotenv').config()
const {isTokenValid, attachCookiesToResponse}= require('../utils/jwt')
const Token= require('../models/Token')

const authenticateUser=async(req,res,next)=>{
    /*const authHeader= req.headers.authorization 
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       throw new CustomAPIError('authorization invalid',401)
    }
    const token= authHeader.split(' ')[1]*/
    const {refreshToken,accessToken}= req.signedCookies
    console('auth')
    try{
        /*const payload= jwt.verify(token, process.env.JWT_SECRET)
        req.user={
            userId:payload.userId,
            name:payload.name,
            role:payload.role
        }*/
        if(accessToken){
            const payload= isTokenValid(accessToken)
            if(!payload){
                throw new Error('authentication invalid',401)
            }
            const user= await User.findOne({_id:payload.user.userId})
            if(!user){
                throw new Error('authentication invalid',401)
            }
            req.user= payload.user
            return next()
        }
        const payload= isTokenValid(refreshToken)
        if(!payload){
            throw new Error('authentication invalid',401)
        }
        const user= await User.findOne({_id:payload.user.userId})
            if(!user){
                throw new Error('authentication invalid',401)
            }
        req.user=payload.user
        next()
    }catch(error){
        console.log(error)
        throw new CustomAPIError('Authentication invalid',401)
    }
}

const authorizePermissions=(req,res,next)=>{
    if(req.user.role!=='admin'){
        throw new CustomAPIError('unauthorized user',401)
    }
    next()
}

module.exports= {
    authenticateUser,authorizePermissions
}