import React from "react"
import './User.css'
import { useRef ,useState} from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { UserVerificationBoxActions } from "../store/slices/userVerificationBox";
import useVerifyUserEmail from "../hooks/useVerifyUserEmail";
import { ErrorActions } from "../store/slices/error-slice";
import { SpinnerActions } from "../store/slices/spinner-slice";
import { UserLoggedInActions } from "../store/slices/userLoggedIn-slice";
const Login:React.FC=()=>{
    const dispatch= useDispatch()
    const verify=useVerifyUserEmail()
    const history= useHistory()
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const tokenRef=useRef<HTMLInputElement>(null)
    
   //const [tokenEnable,setTokenEnable]=useState(false)

   interface UserVerificationBoxType{
    UserVerification:{
        showUserVerificationBox:boolean
    }
}
const showUserVerificationBox=useSelector((state:UserVerificationBoxType)=>state.UserVerification.showUserVerificationBox)

    const loginClick=()=>{

    type user={
        email:string,
        password:string
    }    
    let user:user
          
             user={
                email:emailRef.current!.value,
                password:passwordRef.current!.value
               }
       fetch('http://localhost:3000/user/login',{
               method:'POST',
               body:JSON.stringify(user),
               headers:{
                'Content-Type':'application/json'
               }
         }).then((res)=>
                {return res.json()}
                ).then(data=>{
                    if(data.status==='ok' && data.isVerified){
                        dispatch(UserLoggedInActions.setUserLoggedIn(true))
                            history.push('/noteForm')
                            return
                        }
                    else if(data.status==='notVerified'){
                        localStorage.setItem('email',user.email)
                           // setTokenEnable(true)
                            dispatch(UserVerificationBoxActions.setUserVerificationBox(true))
                            dispatch(ErrorActions.setError({
                                isError:true,
                                msg:'Verify your account',
                                type:'warning'
                            }))
                            return
                        }
                    else if(data.status==='invalid'){
                        //add a invalid details modal
                        dispatch(ErrorActions.setError({
                            isError:true,
                            msg:'Invalid credentials',
                            type:'danger'
                        }))
                        return
                    } else{
                        dispatch(ErrorActions.setError({
                            isError:true,
                            msg:'some error occured',
                            type:'warning'
                        }))
                    }
                   
                    
                }).catch(error=>{
                    console.log(error)
                    //add a something went wrong modal
                })
    }

    const crossClick=()=>{
        dispatch(UserVerificationBoxActions.setUserVerificationBox(true))
    }
    const verifyUser=()=>{
        const input={
            email:localStorage.getItem('email')!,
            token:tokenRef.current!.value
        }
        verify(input)
        /*fetch('http://localhost:3000/user/verifyEmail',{
                       method:'PATCH',
                       body:JSON.stringify(input),
                       headers:{
                        'Content-Type':'application/json'
                       }
                 }).then((res)=>
                 {return res.json()}
                 ).then(data=>{
                     dispatch(VerifyTokenActions.setVerifyToken(false))
                     if(data.status==='ok' && data.isVerified){
                        history.push('/noteForm')
                        return
                     }
                     //add a error occured modal her
                 }).catch(error=>{
                     console.log(error)
                     //add a modal
                 })*/
    }

    return(
        <>
        
         <div className="user-credentials">
         {!showUserVerificationBox && <div className="login-form"> 
                <form action="" >
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email"  className="email" ref={emailRef}/>
                </form>
                <form action="" >
                     <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password"  className="password" ref={passwordRef}/>
                </form>
                <div className="button-form">
                    <button onClick={loginClick}>Login</button>
    </div>
                
              </div>}
           {showUserVerificationBox && <div className="tokenModal">
              <div className="close">
                <div className="empty"></div>
                <div className="cross" onClick={crossClick}>X</div>
                </div>
                    <div className="content">A confirmation email with a token has been sent to your email account. Kindly enter the token below to verify the account. </div>
                    <div><input type="text" name="token" id="token"  className="token" ref={tokenRef}/></div>
                    <div><button onClick={verifyUser}>Submit</button></div>
                </div>}   
              
        </div>
        </>
    )
}
export default Login