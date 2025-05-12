import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import '../css/UserProfile.css'
import Profile from '../components/Profile';
import { Footer } from 'antd/es/layout/layout';
import AppFooter from '../components/Footer';

function UserProfile() {


  return (
    <>
    <Navbar/>
    <Profile />
    <AppFooter/>
    </>
  )
}

export default UserProfile