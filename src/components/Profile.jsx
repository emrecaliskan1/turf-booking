import React, { useState, useEffect } from 'react';
import { Card, Button, List } from 'antd';
import {deleteReservation, getUserReservations } from '../services/reservations';
import { toast, ToastContainer } from 'react-toastify';
import '../css/UserProfile.css'

function Profile() {

    const [reservations, setReservations] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //GİRİŞ YAPILAN KULLANICININ REZERVASAYONLARINI GÖRÜNTÜLEMEK İÇİN USEEFFECT
    useEffect(() => {
        const fetchUserReservations = async () => {
            try {
                const data = await getUserReservations(currentUser?.username);
                setReservations(data);
            } catch (error) {
                toast.error('Rezervasyonlar yüklenirken bir hata oluştu.');
            }
        };
        fetchUserReservations();
    }, []);


    //REZERVASYON SİLME
    const handleDelete = async (reservationId) => {
        try {
            await deleteReservation(reservationId);
            setReservations((prev) => prev.filter((res) => res.id !== reservationId));
            toast.info("Rezervasyonunuz silinmiştir.")
        } catch (error) {
            toast.error('Rezervasyon silinemedi.');
        }
    };    


  return (
    <div className='user-reservations'>
            <Card title='Rezervasyonlarım' className="user-reservations-card" >

                <List
                    itemLayout='horizontal'
                    dataSource={reservations}
                    renderItem={(reservation) => (

                        <List.Item
                            actions={[<Button type='primary' danger onClick={() => handleDelete(reservation.id)}>Sil</Button>]}>
                            {reservation.date} - {reservation.fieldName} - {reservation.startTime} - {reservation.endTime}
                        </List.Item>
                    )}
                />
            </Card>
         <ToastContainer  autoClose={500}/>               
        </div>
  )
}

export default Profile