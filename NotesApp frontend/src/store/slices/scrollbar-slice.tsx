import { createSlice } from "@reduxjs/toolkit";

interface ScrollStateType{
    isScroll:boolean,
}
const initialState:ScrollStateType={
   isScroll:false,
}


const ScrollSlice=createSlice({ 
    name:'Scroll',
    initialState:initialState,
    reducers:{
       setScroll(state:ScrollStateType,action:{payload:boolean}){
           state.isScroll=action.payload
       }
    }
})

export default ScrollSlice
export const ScrollActions=ScrollSlice.actions