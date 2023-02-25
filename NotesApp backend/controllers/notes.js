
const CustomAPIError = require('../errors/custom-error')
const Note=require('../models/note')
const {StatusCodes}= require('http-status-codes')


const addNote=async(req,res)=>{
    console.log('hello')
    req.body.createdBy= req.user.userId
    const {heading,content}=req.body
    if(content.trim()==='' || heading.trim()===''){
        throw new CustomAPIError('add content and heading',204)
    }
    const note= Note.create(req.body)
    res.status(StatusCodes.CREATED).json({status:'ok',msg:'note has been added successfully'})
}
const getNote=async(req,res)=>{
    const userId= req.user.userId 
    const noteId= req.params.id 
    const note= await Note.findOne({
        _id:noteId,
        createdBy:userId
    }).populate({
        path:'createdBy',
        select:'name email'
    })
    if(!note){
        throw new CustomAPIError('note not found',404)
    }
    res.status(StatusCodes.OK).json({status:'ok',note})
}

const getAllNotes=async(req,res)=>{
    const allNotes=await Note.find({
        createdBy:req.user.userId
    }).sort('createdAt').populate({
        path:'createdBy',
        select:'name email'
    })
    res.status(StatusCodes.OK).json({status:'ok',allNotes,count:allNotes.length})
}
const deleteNote=async(req,res)=>{
   const{
     params:{id:noteId},
     user:{userId}
   }= req
   const note=await Note.findOne({
    _id:req.params.id,
    createdBy:req.user.userId
   })
   if(!note){
    throw new CustomAPIError('note not found',204)
   }
   note.remove()
   res.status(StatusCodes.OK).send({status:'ok',msg:'note has been removed'})
}
const deleteSelectedNotes=async(req,res)=>{
    try {
        const ids= req.params.id
        const newIds= ids.split('$').splice(1,newIds.length)
        newIds.forEach(async(id) => {
            const note=await Note.findOne({_id:id,createdBy:req.user.userId})
            if(!note) return
            await Note.findOneAndDelete({_id:id,createdBy:req.user.userId})
        });
        res.status(StatusCodes.OK).json({status:'ok',msg:'all selected notes have been successfully deleted'})
    } catch (error) {
        console.log(error)
    }
    
}

const deleteAllNotes=async(req,res)=>{
    const notes=await Note.find({createdBy:req.user.userId})
    if(notes.length===0){
        throw new CustomAPIError('notes not found',404)
       }
    await Note.deleteMany({
     createdBy:req.user.userId
    })                 
    res.status(StatusCodes.OK).send({status:'ok',msg:'notes have been removed'})
 }

 const editNote=async(req,res)=>{
    const {
    body:{heading,content},
    user:{userId},
    params:{id:noteId}
    }=req
    if(!content || !heading ||content.trim()===''||heading.trim()===''){
        throw new CustomAPIError('give content and heading',400)
    }
    const note=await Note.findOne({_id:noteId,createdBy:userId})
       if(!note){
        throw new CustomAPIError('note not found',204)
       }
    const updatedNote=await Note.findOneAndUpdate({
        _id:noteId,
        createdBy:userId},
         req.body,
        {new:true,runValidators:true})
        if(!updatedNote){
            throw new CustomAPIError('no note available',404)
        }
        res.status(StatusCodes.OK).json({status:'ok',updatedNote})
}
module.exports={
    addNote,
    getNote,
    getAllNotes,
    deleteNote,
    editNote,
    deleteAllNotes,
    deleteSelectedNotes
}
