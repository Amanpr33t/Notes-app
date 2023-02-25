import {  configureStore} from "@reduxjs/toolkit";
import LoginSlice from "./slices/login-slice";
import UserVerificationBoxSlice from "./slices/userVerificationBox";
import ErrorSlice from "./slices/error-slice";
import SpinnerSlice from "./slices/spinner-slice";
import UserLoggedInSlice from "./slices/userLoggedIn-slice";
import ScrollSlice from "./slices/scrollbar-slice";
const store= configureStore({
    reducer:{
     isLogin:LoginSlice.reducer,
     UserVerification:UserVerificationBoxSlice.reducer,
     error:ErrorSlice.reducer,
     spinner:SpinnerSlice.reducer,
     userLoggedIn:UserLoggedInSlice.reducer,
     scroll:ScrollSlice.reducer
    }
})

export default store