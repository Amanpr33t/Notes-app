import React from 'react';
import Navbar from './components/Navbar';
import SendEmail from './components/SendEmail';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import NoteButtons from './components/NoteButtons';
import NoteModal from './components/NoteModal';
import UserSignUp from './components/UserSignUp'
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import Error from './components/Error';
import Spinner from './components/Spinner';
import {Route,Switch,useHistory} from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './App.css'
function App() {

  const history= useHistory()
  interface ErrorStateType{
    error:{
      isError:boolean
    },
    spinner:{
      isSpinner:boolean
    }
  }
  const isError=useSelector((state:ErrorStateType)=>state.error.isError)
  const isSpinner=useSelector((state:ErrorStateType)=>state.spinner.isSpinner)
  return (
    <>
    <Navbar/>
   {!isSpinner &&isError && <Error/>}
   {/*isSpinner&&<Spinner/>*/}
   {!isSpinner &&<Switch>
   <Route path='/login' exact><Login/></Route>
   <Route path='/signUp' exact><UserSignUp/></Route>
   <Route path='/updatePassword' exact><UpdatePassword/></Route>
   <Route path='/forgotPassword' exact><ForgotPassword/></Route>
   <Route path='/sendEmail' exact><SendEmail/></Route>
   <Route path='/noteForm' exact><SendEmail/><NoteForm/></Route>
   </Switch>}

    {/*
    
    <NoteButtons/>
    <NoteCard/>*/}
   {/*<NoteModal/>*/} 
    </>
  );
}

export default App;
