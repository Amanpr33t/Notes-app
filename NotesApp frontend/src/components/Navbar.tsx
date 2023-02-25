import React from "react"
import './Navbar.css'
import {Link,useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { LoginActions } from "../store/slices/login-slice"
import { useState } from "react"
import { UserLoggedInActions } from "../store/slices/userLoggedIn-slice"
const Navbar:React.FC=()=>{
    const history= useHistory()
    const [loginEnable,setLoginEnable]= useState(true)
    const dispatch= useDispatch()

    interface LoginStateType{
        isLogin:{
            isLogin:boolean
        }
    }
    interface UserLoggedInStateType{
        userLoggedIn:{
            isUserLoggedIn:boolean
        }
    }
    const isLogin=useSelector((state:LoginStateType)=>state.isLogin.isLogin)
    const isUserLoggedIn=useSelector((state:UserLoggedInStateType)=>state.userLoggedIn.isUserLoggedIn)
    console.log(isUserLoggedIn,'isUserLoggedIn')

    const loginSignUp=()=>{
        if(isLogin){
            dispatch(LoginActions.setLogin(false))
        }else{
            dispatch(LoginActions.setLogin(true))
        }
    }
    const logout=()=>{
        history.push('/login')
        dispatch(UserLoggedInActions.setUserLoggedIn(false))
        //also add backend logic
    }
    const contact=()=>{
        arrowFunc()
        history.push('/sendEmail')
    }
    const [arrow,setArrow]=useState('▼')
    const arrowFunc=()=>{
         if(arrow==='▼'){
            setArrow('▲')
            document.getElementById('user-nav')!.classList.remove('disabled')
         }else{
            setArrow('▼')
            document.getElementById('user-nav')!.classList.add('disabled')
         }
    }
    const homeClick=()=>{
        if(isUserLoggedIn){
            history.push('./noteForm')
        }
    }
    return(
        <>
         <div className="nav">
            <div className="heading" onClick={homeClick}>NotesApp</div>
            <div className="empty-nav"></div>
        
            {!isUserLoggedIn && isLogin?<Link to='/signUp' className="signUp-nav" onClick={loginSignUp} id='signUpId'>SignUp</Link>:<Link to='/login' className="login-nav" onClick={loginSignUp} id='loginId'>Login</Link>}
            
            
             
           {isUserLoggedIn && <div className="arrow" onClick={arrowFunc}> {arrow}</div>}
         </div>
         <div className="user-nav disabled" id='user-nav'>
            <div className="element" onClick={contact}>Contact</div>
            <div className="element">Change Password</div>
            <div className="element" onClick={logout}>Logout</div>
        </div>
         
        </>
    )
}
export default Navbar