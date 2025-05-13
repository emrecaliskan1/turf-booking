import React, { useState, useEffect } from 'react';
import { Card, Button, List, Modal, Input, Form } from 'antd';
import {deleteReservation, getUserReservations } from '../services/reservations';
import { toast, ToastContainer } from 'react-toastify';
import { addField,getFields } from '../services/fieldsApi';
import '../css/UserProfile.css'

function Profile() {

    const [reservations, setReservations] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldPrice, setFieldPrice] = useState('');


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


    // HALI SAHA EKLEME
    const handleAddField = async () => {
        if (!fieldName || !fieldPrice) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;}
        try {
            await addField({id:Math.floor(100 + Math.random()*90), name:fieldName, price: fieldPrice });
            toast.success("Halı saha başarıyla eklendi.");
            handleCancel();
        } catch (error) {
            toast.error("Halı saha eklenirken bir hata oluştu.");
        }
    };

    
     // MODALİ AÇMA
    const showModal = () => {
        setIsModalVisible(true);
    };

    // MODALİ KAPATMA
    const handleCancel = () => {
        setIsModalVisible(false);
        setFieldName('');
        setFieldPrice('');
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
                 <Button type="default" onClick={showModal} style={{ marginTop: '40px' ,marginLeft:'700px'}}>
                    Halı Saha Ekle
                </Button>

            </Card>

              <Modal
                title="Halı Saha Ekle"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleAddField}
                okText="Ekle"
                cancelText="İptal"
            >
                <Form layout="vertical">

                    <Form.Item label="Halı Saha Adı">
                        <Input 
                            placeholder="Halı Saha Adı"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Saatlik Ücret (TL)">
                        <Input 
                            placeholder="Fiyat"
                            value={fieldPrice}
                            onChange={(e) => setFieldPrice(e.target.value)}
                            type="number"
                        />
                    </Form.Item>

                </Form>

            </Modal>

         <ToastContainer  autoClose={500}/>               
        </div>
  )
}

export default Profile