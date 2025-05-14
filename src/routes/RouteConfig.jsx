import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import ReservationForm from '../pages/ReservationForm';
import Basket from '../pages/Basket';
import UserProfile from '../pages/UserProfile';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/reservations' element={<ReservationForm />} />
      <Route path='/basket' element={<Basket />} />
      <Route path='/profile' element={<UserProfile />} />
    </Routes>
  );
};

export default RoutesConfig;