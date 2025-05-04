import { useState } from 'react'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import {Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {


  return (
    <div>

    
      <Routes>
        <Route path='/' element={<RegisterPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/main' element={<MainPage/>}></Route>
      </Routes>
    

      <ToastContainer autoClose={2000}/>
    </div>
  )
}

export default App
