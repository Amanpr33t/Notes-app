import React from "react"
import './NoteForm.css'
import { useRef } from "react"

const NoteForm:React.FC=()=>{
    const headingRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    
    const addNote=()=>{
       const note={
        email:headingRef.current!.value,
        password:contentRef.current!.value
       }
       fetch('http://localhost:3000/notes/addNote',{
               method:'POST',
               body:JSON.stringify(note),
               headers:{
                'Content-Type':'application/json'
               }
         }).then((res)=>
                {return res.json()}
                ).then(data=>{
                    console.log(data) 
                }).catch(error=>{
                    console.log(error)
                })
    }


    return(
        <>
          <div className="noteForm-container">
        <div className="noteForm">
         <form action="" >
                     <label htmlFor="heading">Heading</label>
                    <input type="text" name="heading" id="heading"  className="heading" ref={headingRef}/>
         </form>
        <form action="" >
                     <label htmlFor="content">Content</label>
                    <textarea name="content" id="content"  ref={contentRef}></textarea>
        </form>
        <form action="" >
                     <label htmlFor="image">Image</label>
                     <button>Select</button>
         </form>
                <div className="button-form">
                    <button onClick={addNote}>Save</button>
                </div>
         </div>
        </div>
        </>
    )
}
export default NoteForm