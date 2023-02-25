import React from "react"
import './User.css'
const ForgotPassword:React.FC=()=>{

    return(
        <>
         <div className="user-credentials">
         <div className="forgot-password-form"> 
                <form action="" >
                     <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="newPassword"  className="password"/>
                </form>
                <div className="button-form">
                    <button>Submit</button>
                </div>
        </div>
               </div>
        </>
    )
}
export default ForgotPassword