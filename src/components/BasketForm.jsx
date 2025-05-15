import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Input,Result, DatePicker } from 'antd';
import { addReservation } from '../services/reservations';
import { toast, ToastContainer } from 'react-toastify';
import { getBasketByUser,removeFromBasket,deleteBasket } from '../services/basketApi';
import dayjs from 'dayjs';
import Navbar from './Navbar';
import locale from 'antd/es/date-picker/locale/tr_TR';
import AppFooter from './Footer';
import '../css/Basket.css'

function BasketForm() {

  const [basket, setBasket] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const monthFormat = 'MM/YY';

  //SEPET VERİLERİNİ YÜKLEME
  useEffect(() => {
     const fetchBasket = async () => {
      try {
        const data = await getBasketByUser(currentUser?.id);
        setBasket(data); 
      } catch (error) {
        toast.error("Sepet verileri alınırken hata oluştu.", error);
      }
    };
    if (currentUser?.id) {
      fetchBasket();
    }
  },[currentUser?.id]);


 //ÖDEME İŞLEMİ && SHEETS'E KAYDETME
  const handlePayment = async () => {
    if (basket.length === 0) {
      toast.info("Sepetiniz boş! Lütfen önce rezervasyon ekleyin.");
      return;
    }
    try {
      for (const reservation of basket) {
        const formattedDate = dayjs(reservation.date).format("YYYY-MM-DD");
        const formattedStartTime = dayjs(reservation.startTime, "HH:mm").format("HH:mm");
        const formattedEndTime = dayjs(reservation.endTime, "HH:mm").format("HH:mm");

        const formattedReservation = {
          ...reservation,
          username: currentUser?.username,
          date: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        };
        //REZERVASYONLAR TABLOSUNA EKLEME
        await addReservation(formattedReservation);
      }
        //ÖDENEN REZERVASYONLARI SEPET TABLOSUNDAN SİLME
        await deleteBasket(currentUser.id); 
        setBasket([]);
        setPaymentSuccess(true); 
        } catch (error) {
          toast.error("Ödeme başarısız");
      }
  };


  //SEPETTEN REZERVASYON SİLME İŞLEVİ
  const handleRemoveFromBasket = async (reservationId) => {
    try {
      await removeFromBasket(reservationId);
      setBasket((prevBasket) => prevBasket.filter((item) => item.id !== reservationId)); 
      toast.info('Rezervasyon sepetten silindi.');
    } catch (error) {
      toast.error('Rezervasyon silinemedi.');
    }
  };


   //KREDİ KARTI VALİDASYONU
   const validateCardNumber = (_, value) => {
    if (!value || /^[0-9]{16}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Geçerli bir kart numarası girin! (16 haneli sayı)"));
  };

  //SON KULLANMA TARİHİ VALİDASYONU
  const validateExpiryDate = (_, value) => {
    if (!value || dayjs(value, "MM/YY").isAfter(dayjs())) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Son kullanma tarihi bugünden büyük olmalıdır!"));
  };

  // Kredi Kartı Numarası ve CVV Girişlerini Sadece Sayı ile Sınırlama
  const handleNumericInput = (e) => {
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };


  //ÖDEME BAŞARILI OLURSA ÇIKACAK EKRAN
   if (paymentSuccess) {
    return (
      <>
      <Navbar />
      <Result
        status="success"
        title="Ödeme Başarılı !"
        subTitle="Rezervasyonunuz başarılı bir şekilde oluşturulmuştur..."
        extra={[
          <Button type="primary" key="main" href="/main" style={{ backgroundColor: 'green', fontSize: '17px' }} >
            Ana Sayfaya Dön
          </Button>]}
      />
      </>
    )}
  
  return (
    <>
    <Navbar/>

     <div style={{ padding: '20px' }} className='basket-wrapper'>

      <Card title="Sepet" style={{ width: 650, margin: '0 auto' ,marginTop:'50px'}}>
         {basket.length === 0 ? (<p>Sepetiniz boş.</p>) 
         : (basket.map((item, index) => (
            <Card
                key={index}
                className='basket-card'
                style={{ marginBottom: '10px', padding: '5px 10px' }}
                bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontWeight: 'bold' }}>{item.fieldName}</span>
                  <span>{item.date} | {item.startTime} - {item.endTime}</span>
                  <span>{item.totalPrice} TL</span>
                </div>

              <Button
                  type="primary"
                  size="small"
                  style={{backgroundColor:'#ed4f4c'}}
                  onClick={() => handleRemoveFromBasket(item.id)}>
                  Sil
              </Button>

            </Card>
            ))
          )}

        <Form layout="vertical" style={{ marginTop: '20px' }} onFinish={handlePayment}>

          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={[{ required: true, validator: validateCardNumber }]}>
            <Input  placeholder="XXXX XXXX XXXX XXXX" maxLength={16} onKeyDown={handleNumericInput} />
          </Form.Item>

          <Form.Item
            label="Kartınızın Son Kullanma Tarihi"
            name="expiryDate"
            rules={[{ required: true, validator: validateExpiryDate }]}>
            <DatePicker 
              picker="month" 
              format={monthFormat} 
              locale={locale} 
              placeholder="AA/YY" 
              style={{ width: '100%' }}/>
          </Form.Item>

          <Form.Item
            label="CVC"
            name="cvc"
            rules={[{ required: true, message: "3 Haneli CVV giriniz...", pattern: /^[0-9]{3}$/ }]}>
            <Input placeholder="XXX" maxLength={3} onKeyDown={handleNumericInput} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ backgroundColor: 'green', fontSize: '17px' }}>
            Ödeme Yap
          </Button>

        </Form>

      </Card>
    </div>
    
    <AppFooter/>
    <ToastContainer autoClose={1000}/>
    </>
  )
}

export default BasketForm