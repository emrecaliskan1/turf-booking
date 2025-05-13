import React from 'react';
import Navbar from '../components/Navbar';
import FieldReserv from '../components/FieldReserv';
import AppFooter from '../components/Footer';


const ReservationForm = () => {

  return (
    <div>
        <Navbar />
        <FieldReserv />
        <AppFooter/>
    </div>
 
  );
};

export default ReservationForm;
