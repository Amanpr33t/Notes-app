import React from "react"
import './Error.css'
import './User.css'
import { ErrorActions } from "../store/slices/error-slice"
import { useSelector,useDispatch } from "react-redux"
const Error:React.FC=()=>{
    const dispatch= useDispatch()
    interface ErrorStateType{
        error:{
          isError:boolean;
          msg:string,
          type:string
        }
      }
      const isError=useSelector((state:ErrorStateType)=>state.error.isError)
      const message=useSelector((state:ErrorStateType)=>state.error.msg)
      const type=useSelector((state:ErrorStateType)=>state.error.type)

    // document.getElementById('errormodal')!.classList.add(type)

const buttonClick=()=>{
    const input={
        isError:false,
        msg:'',
        type:''
     }
 dispatch(ErrorActions.setError(input))
}
    return(
        <>
         <div className={`errorModal ${type}`} id='errorModal'>
            <div className="message">{message}</div>
            <div className="button">
            <button id='button' onClick={buttonClick}>X</button>
            </div>  
         </div>
         
        </>
    )
}
export default Error