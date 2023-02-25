import { createSlice } from "@reduxjs/toolkit";

interface SpinnerStateType{
    isSpinner:boolean,
}
const initialState:SpinnerStateType={
   isSpinner:false,
}


const SpinnerSlice=createSlice({ 
    name:'Spinner',
    initialState:initialState,
    reducers:{
       setLogin(state:SpinnerStateType,action:{payload:boolean}){
           state.isSpinner=action.payload
       }
    }
})

export default SpinnerSlice
export const SpinnerActions=SpinnerSlice.actions