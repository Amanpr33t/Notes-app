import React from "react"
import './User.css'
const UpdatePassword:React.FC=()=>{

    return(
        <>
         <div className="user-credentials">
         <div className="update-password-form"> 
                <form action="" >
                     <label htmlFor="password">Old Password</label>
                    <input type="text" name="password" id="oldPassword"  className="password"/>
                </form>
                <form action="" >
                     <label htmlFor="password">New Password</label>
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
export default UpdatePassword