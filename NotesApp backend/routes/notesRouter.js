const express= require('express')
const router= express.Router()
const {addNote,getNote,getAllNotes,deleteNote,editNote,deleteAllNotes,deleteSelectedNotes}= require('../controllers/notes')

router.post('/addNote',addNote)
router.get('/getAllNotes',getAllNotes)
router.delete('/deleteAllNotes',deleteAllNotes)
router.get('/getNote/:id',getNote)
router.post('/deleteNote/:id',deleteNote)
router.patch('/editNote/:id',editNote)
router.delete('/deleteSelectedNotes/:id',deleteSelectedNotes)

module.exports= router