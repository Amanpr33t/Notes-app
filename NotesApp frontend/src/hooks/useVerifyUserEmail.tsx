import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { UserVerificationBoxActions } from "../store/slices/userVerificationBox"
import { ErrorActions } from "../store/slices/error-slice"
import { UserLoggedInActions } from "../store/slices/userLoggedIn-slice"
const useVerifyUserEmail=()=>{
    const history= useHistory()
    const dispatch=useDispatch()
    interface InputType{
        email:string,
        token:string
    }
    const verify=(input:InputType)=>{
        fetch('http://localhost:3000/user/verifyEmail',{
            method:'PATCH',
            body:JSON.stringify(input),
            headers:{
             'Content-Type':'application/json'
            }
        }).then((res)=>
         {return res.json()}
         ).then(data=>{
           
             if(data.status==='ok' && data.isVerified){
                dispatch(UserVerificationBoxActions.setUserVerificationBox(false))
                dispatch(UserLoggedInActions.setUserLoggedIn(true))
                history.push('/noteForm')
                dispatch(ErrorActions.setError({
                    isError:false,
                    msg:'',
                    type:''
                }))
                return
             }
             else if(data.status==='failed' ){
                dispatch(UserVerificationBoxActions.setUserVerificationBox(true))
                dispatch(ErrorActions.setError({
                    isError:true,
                    msg:'Account could not be verified',
                    type:'danger'
                }))
                return
             }
             dispatch(ErrorActions.setError({
                isError:true,
                msg:'Account could not be verified',
                type:'danger'
            }))
         }).catch(error=>{
             console.log(error)
             //add a modal
         })
    }
    
     return verify
}
export default useVerifyUserEmail