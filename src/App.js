import './App.css';
import React, { Component, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Redirect, Routes, Router, } from "react-router-dom";
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Profile from './components/Profile';
import { useNavigate } from 'react-router-dom';
import { GenerateToken } from './components/APIs/Auth/auth';
export default function App() {

  useEffect(() => {
    GenerateToken();
    // if (isAuthenticated) {
    //   console.log("isAuthenticatedisAuthenticated", isAuthenticated)
    //   window.location = ("/profile")
    // }else{
    //   console.log("elseeeee")
    //   // window.location = ("/profile")
    // }
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
