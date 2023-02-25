import { createSlice } from "@reduxjs/toolkit";

interface ErrorStateType{
    isError:boolean,
    msg:string,
    type:string
}
const initialState:ErrorStateType={
   isError:false,
   msg:'',
   type:''
}
interface PayloadType{
    isError:boolean,
    msg:string,
    type:string
}

const ErrorSlice=createSlice({ 
    name:'Error',
    initialState:initialState,
    reducers:{
       setError(state:ErrorStateType,action:{payload:PayloadType}){
           state.isError=action.payload.isError;
           state.msg=action.payload.msg
           state.type=action.payload.type
       }
    }
})

export default ErrorSlice
export const ErrorActions=ErrorSlice.actions