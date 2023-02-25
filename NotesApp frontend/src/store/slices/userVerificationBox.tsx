import { createSlice } from "@reduxjs/toolkit";

interface UserVerificationBoxType{
    showUserVerificationBox:boolean,
}
const initialState:UserVerificationBoxType={
   showUserVerificationBox:false,
}


const UserVerificationBoxSlice=createSlice({ 
    name:'UserVerificationBox',
    initialState:initialState,
    reducers:{
       setUserVerificationBox(state:UserVerificationBoxType,action:{payload:boolean}){
           state.showUserVerificationBox=action.payload
       }
    }
})

export default UserVerificationBoxSlice
export const UserVerificationBoxActions=UserVerificationBoxSlice.actions