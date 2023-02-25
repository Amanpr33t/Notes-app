const CustomAPIError = require("../errors/custom-error")
const sendEmail=require('../utils/sendEmail')
const contact=async(req,res)=>{
    //get 'from' from frontend. Store it in localStorage
    try {
        const {from,subject,msg}=req.body
   const emailContent={
        from,
        to:process.env.ADMIN_EMAIL,
        subject,
        msg
    }
     sendEmail(emailContent)
     res.status(200).json({status:'ok',msg:'email has been sent'}) 
    } catch (error) {
        console.log(error)
    }
   
}
module.exports=contact