import React from 'react';
import Navbar from '../components/Navbar'
import '../css/UserProfile.css'
import Profile from '../components/Profile';
import AppFooter from '../components/Footer';

const UserProfile = () => {

  return (
    <>
      <Navbar/>
      <Profile />
      <AppFooter/>
    </>
  )
}

export default UserProfile