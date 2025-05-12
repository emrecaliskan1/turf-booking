import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Input,Result } from 'antd';
import { addReservation } from '../services/reservations';
import { toast, ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import Navbar from './Navbar';
import '../css/Basket.css'


function BasketForm() {

  const [basket, setBasket] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  //SEPET VERİLERİNİ YÜKLEME
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedBasket);
  }, []);


 //ÖDEME İŞLEMİ && SHEETS'E KAYDETME
  const handlePayment = async () => {
    try {
      for (const reservation of basket) {
        const formattedDate = dayjs(reservation.date).format("YYYY-MM-DD");
        const formattedStartTime = dayjs(reservation.startTime, "HH:mm").format("HH:mm");
        const formattedEndTime = dayjs(reservation.endTime, "HH:mm").format("HH:mm");

        const formattedReservation = {
          ...reservation,
          date: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        };

        await addReservation(formattedReservation);
      }
      localStorage.removeItem("basket");
      localStorage.setItem("basketCount", 0);
      setBasket([]);
      setPaymentSuccess(true);
    } catch (error) {
      toast.error("Ödeme başarısız");
    }
  };

  // REZERVASYON SİLME İŞLEVİ
  const handleRemoveFromBasket = (index) => {
    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1); 
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket)); 
    toast.success('Rezervasyon sepetten silindi.'); 
  };


   //KREDİ KARTI VALİDASYONU
   const validateCardNumber = (_, value) => {
    if (!value || /^[0-9]{16}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Geçerli bir kart numarası girin (16 haneli sayı)!"));
  };


  //SON KULLANMA TARİHİ VALİDASYONU
   const validateExpiryDate = (_, value) => {
    if (!value || dayjs(value, "MM/YY").isAfter(dayjs())) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Son kullanma tarihi bugünden büyük olmalıdır!"));
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
          </Button>
        ]}
      />
      </>
    )}
  
  return (
    <>
    <Navbar  />

     <div style={{ padding: '20px' }} className='basket-wrapper'>

      <Card title="Sepet" style={{ width: 650, margin: '0 auto' ,marginTop:'50px'}}>
         {basket.length === 0 ? (<p>Sepetiniz boş.</p>) : (basket.map((item, index) => (
            <Card
                key={index}
                style={{ marginBottom: '10px', padding: '5px 10px' }}
                bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}
              >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold' }}>{item.fieldName}</span>
                <span>{item.date} | {item.startTime} - {item.endTime}</span>
                <span>{item.totalPrice} TL</span>
              </div>
            <Button
                type="danger"
                size="small"
                onClick={() => handleRemoveFromBasket(index)}>
                Sil
            </Button>
            </Card>
            ))
          )}

        <Form layout="vertical" style={{ marginTop: '20px' }} onFinish={handlePayment}>

          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={[{ required: true, validator: validateCardNumber }]}
          >
            <Input  placeholder="XXXX XXXX XXXX XXXX" maxLength={16}/>
          </Form.Item>

          <Form.Item
            label="Kartınızın Son Kullanma Tarihi"
            name="expiryDate"
            rules={[{ required: true, validator: validateExpiryDate }]}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>

          <Form.Item
            label="CVC"
            name="cvc"
            rules={[{ required: true, message: "CVC girin!", pattern: /^[0-9]{3}$/ }]}
          >
            <Input placeholder="XXX" maxLength={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ backgroundColor: 'green', fontSize: '17px' }}>
            Ödeme Yap
          </Button>

        </Form>

      </Card>
    </div>
    <ToastContainer autoClose={1000}/>
    </>
  )
}

export default BasketForm