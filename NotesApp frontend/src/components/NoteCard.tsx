import React from "react"
import './NoteCard.css'
import { useRef } from "react"
const NoteCard:React.FC=()=>{

    return(
        <>
         <div className="note-card-container">
            <div className="note-card">
            <form action="" >
                    <input type="checkbox" name="checkbox" id="checkbox"  className="checkbox"/>
         </form>
                <div className="heading">
                   <p>You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a .......
                   </p>
                </div>
                <div className="button">
                    <button>Expand</button>
                </div>
            </div>
            


            <div className="button-last">
                <div className="deleteSelected">
                <button>Delete Selected Notes</button>
                </div>
            
                <div className="empty-noteCard"></div>
    </div>
         
        </div>
        
        </>
    )
}
export default NoteCard