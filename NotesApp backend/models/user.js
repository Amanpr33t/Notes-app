const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
require('dotenv').config()
const validator= require('validator')
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxLength:[50,'name cannot be more than 20 characters'],
        minLength:[3,'name cannot be less than 3 characters']
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        validate:{
            validator:validator.isEmail,
            message:'please provide valid email'
        }
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minLength:6
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    verificationToken:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    
    verified:Date,
    passwordToken:{
        type:String
    },
    passwordTokenExpirationDate:{
        type:Date
    },
    forgotPasswordEnabler:{
        type:Boolean,
        default:false
    }
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

UserSchema.statics.hashPassword=async function(){
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
}
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return
   const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    //await this.constructor.hashPassword()
   next()
})
UserSchema.pre('remove',async function(next){
    await this.model('Note').deleteMany({createdBy:this._id})
    next()
})
UserSchema.methods.createJWT=function(){
    return jwt.sign({
        userId:this._id,name:this.name,role:this.role},
        process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
}
UserSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
UserSchema.virtual('notes',{
    ref:'Note',
    localField:'_id',
    foreignField:'createdBy',
    justOne:false,
    match:{createdBy:this._id}
})
module.exports=  mongoose.model('User',UserSchema)