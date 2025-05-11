import React, { useState } from 'react';
import { addReservation } from '../services/reservations';
import { Form, Input, DatePicker, TimePicker, Select, Button, message } from 'antd';
import Navbar from '../components/Navbar';
import FieldReserv from '../components/FieldReserv';




const ReservationForm = () => {

  return (
    <div>
        <Navbar />
        <FieldReserv />
    </div>
 
  );
};

export default ReservationForm;
