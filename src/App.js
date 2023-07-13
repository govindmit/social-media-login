import './App.css';
import React, { useEffect } from "react";
import { Route, Routes, } from "react-router-dom";
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Profile from './components/Profile';
import { useNavigate } from 'react-router-dom';
import { GenerateToken } from './components/APIs/Auth/auth';
export default function App() {

  useEffect(() => {
    GenerateToken();

  }, [])

  return (

    <Routes>
      {/* <Route path="/register" component={RegisterForm} /> */}
      <Route exact path='/' element={<RegisterForm />} /> 
      <Route exact path='/login' element={<LoginForm />} />    
      <Route exact path='/profile' element={<Profile />} />
      {/* <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} /> */}
    </Routes>

  )
}
