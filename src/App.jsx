import { useState } from 'react'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import {Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ReservationForm from './pages/ReservationForm';
import Basket from './pages/Basket';
import UserProfile from './pages/UserProfile';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>

      <Routes>
        <Route path='/' element={<RegisterPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/main' element={<MainPage/>}></Route>
        <Route path='/reservations' element={<ReservationForm/>}></Route>
        <Route path='/basket' element={<Basket/>}></Route>
        <Route path='/profile' element={<UserProfile/>}></Route>
      </Routes>
    

      <ToastContainer autoClose={2000}/>
    </div>
  )
}

export default App