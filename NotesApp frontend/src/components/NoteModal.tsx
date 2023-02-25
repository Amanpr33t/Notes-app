import React from "react"
import './NoteModal.css'
const NoteModal:React.FC=()=>{

    return(
        <>
       <div className="note-modal">
         <div className="modal">
            <div className="heading">
               <div className="heading-tag">Heading</div>
                <div className="heading-data">You can do this using css styles, if you set overflow-y: scroll on the scrollable element, </div>
            </div>
            <div className="content">
                <div className="content-tag">Content</div>
                <div className="content-data">You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar, You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar, You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar, You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar,You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar,You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar,You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar,You can do this using css styles, if you set overflow-y: scroll on the scrollable element, you can get a scrollbar, </div>
            </div>
            
          </div>
          <div className="button-modal">
                <button>Delete Note</button>
                <button>Edit Note</button>
                <button>Close</button>
            </div>
          
       </div>
        </>
    )
}
export default NoteModal