
import { createSlice } from "@reduxjs/toolkit";

interface UserLoggedInStateType{
    isUserLoggedIn:boolean,
}
const initialState:UserLoggedInStateType={
   isUserLoggedIn:false,
}


const UserLoggedInSlice=createSlice({ 
    name:'UserLoggedIn',
    initialState:initialState,
    reducers:{
       setUserLoggedIn(state:UserLoggedInStateType,action:{payload:boolean}){
           state.isUserLoggedIn=action.payload
       }
    }
})

export default UserLoggedInSlice
export const UserLoggedInActions=UserLoggedInSlice.actions