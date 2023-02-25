import React from "react"
import './NoteButtons.css'
const NoteButtons:React.FC=()=>{

    return(
        <>
         <div className="button-container">
           <button>Show All Notes</button>
           <button>Delete All Notes</button>
           <button>Select Notes</button>
         </div>
         
        </>
    )
}
export default NoteButtons