import React, { useState } from 'react'
import { Card, Carousel } from 'antd';
import {fields} from '../data/Fields'
import Navbar from '../components/Navbar';
import '../css/Fields.css'
import { ToastContainer } from 'react-toastify';
import FieldsList from '../components/FieldsList';


const Fields = () =>  {

  return (
    <>
    <Navbar />
    <FieldsList />
    <ToastContainer autoClose={1500}></ToastContainer>
    </>
  )
}

export default Fields