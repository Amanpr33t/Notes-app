import React from "react"
import './SendEmail.css'
import { useRef } from "react"
import { ErrorActions } from "../store/slices/error-slice"
import { useDispatch } from "react-redux"
const SendEmail:React.FC=()=>{
    const dispatch= useDispatch()
    const subjectRef=useRef<HTMLInputElement>(null)
    const messageRef=useRef<HTMLTextAreaElement>(null)
    const click=()=>{
        const emailData={
            from:localStorage.getItem('email'),
            subject:subjectRef.current!.value,
            msg:messageRef.current!.value
        }
        fetch('http://localhost:3000/contact',{
            method:'POST',
            body:JSON.stringify(emailData),
            headers:{
             'Content-Type':'application/json'
            }
      }).then((res)=>
             {return res.json()}
             ).then(data=>{
                console.log(data)
                 if(data.status==='ok'){
                    dispatch(ErrorActions.setError({
                        isError:true,
                        msg:'Email has been sent',
                        type:'success'
                    }))
                 }else{
                    dispatch(ErrorActions.setError({
                        isError:true,
                        msg:'Some error occured',
                        type:'danger'
                    }))
                 }

             }).catch(error=>{
                 console.log(error)
                 //add a modal
             })
    }
    return(
        <>
        <div className="email-container">
        <div className="email">
         <form action="" >
                     <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" id="subject"  className="subject" ref={subjectRef}/>
         </form>
        <form action="" >
                     <label htmlFor="message">Message</label>
                    {<textarea name="message" id="message"  rows={Number(10)} ref={messageRef}></textarea>}
        </form>
                <div className="button-form">
                    <button onClick={click}>Send</button>
                </div>
         </div>
        </div>
        
         
        </>
    )
}
export default SendEmail