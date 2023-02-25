 import React from "react"
 import { useHistory } from "react-router-dom"
 import { useRef,useState } from "react"
 import './User.css'
 import { useSelector, useDispatch } from "react-redux"
 import useVerifyUserEmail from "../hooks/useVerifyUserEmail"
 import { UserVerificationBoxActions } from "../store/slices/userVerificationBox"
 import { ErrorActions } from "../store/slices/error-slice"
import { LoginActions } from "../store/slices/login-slice"

    const SignUp:React.FC=()=>{
        const dispatch= useDispatch()
           // const [tokenEnable,setTokenEnable]=useState(false)
           const verify=useVerifyUserEmail()
            const history= useHistory()
            const emailRef=useRef<HTMLInputElement>(null)
            const passwordRef=useRef<HTMLInputElement>(null)
            const nameRef=useRef<HTMLInputElement>(null)
            const tokenRef=useRef<HTMLInputElement>(null)

            dispatch(LoginActions.setLogin(false))

            interface UserVerificationBoxType{
                UserVerification:{
                    showUserVerificationBox:boolean
                }
            }
            interface ErrorStateType{
                error:{
                    isError:boolean
                }
            }
            const showUserVerificationBox=useSelector((state:UserVerificationBoxType)=>state.UserVerification.showUserVerificationBox)
            console.log(showUserVerificationBox)
            const isError= useSelector((state:ErrorStateType)=>state.error.isError)
          

            const SignUpClick=()=>{
               const user={
                name:nameRef.current!.value,
                email:emailRef.current!.value,
                password:passwordRef.current!.value
               }
             
               
               fetch('http://localhost:3000/user/signUp',{
                       method:'POST',
                       body:JSON.stringify(user),
                       headers:{
                        'Content-Type':'application/json'
                       }
                 }).then((res)=>
                        {return res.json()}
                        ).then(data=>{
                            if(data.status==='userExists'){
                                dispatch(ErrorActions.setError({
                                    isError:true,
                                    msg:'User already exists.',
                                    type:'warning'
                                }))
                            }else if(data.status==='verifyAccount'){
                              dispatch(UserVerificationBoxActions.setUserVerificationBox(true))
                                localStorage.setItem('email',user.email)
                                dispatch(ErrorActions.setError({
                                    isError:true,
                                    msg:'Verify your account',
                                    type:'success'
                                }))
                            }else{
                                dispatch(ErrorActions.setError({
                                    isError:true,
                                    msg:'some error occured',
                                    type:'warning'
                                }))
                            }

                        }).catch(error=>{
                            console.log(error)
                            //add a modal
                        })
            }
            const crossClick=()=>{
                dispatch(UserVerificationBoxActions.setUserVerificationBox(false))
            }

            const verifyUser=()=>{
                
                const input={
                    email:localStorage.getItem('email')!,
                    token:tokenRef.current!.value
                }
                verify(input)
               /* fetch('http://localhost:3000/user/verifyEmail',{
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
              
              {!showUserVerificationBox  && <div className="signUp-form">
                <form action="">
                   <label htmlFor="name" className="label">Name</label>
                    <input type="text" name="name" id="name"  className="name" ref={nameRef}/>
                </form>  
                <form action="" >
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email"  className="email" ref={emailRef}/>
                </form>
                <form action="" >
                     <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password"  className="password" ref={passwordRef}/>
                </form>
                <div className="button-form">
                    <button onClick={SignUpClick}>SignUp</button>
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
        export default SignUp
