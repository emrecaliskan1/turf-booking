import React from 'react'
import { Card, Form, Input, Select, DatePicker, TimePicker, Button } from 'antd';
import { fields } from '../data/Fields';
import { toast, ToastContainer } from 'react-toastify';
import '../css/FieldReserv.css'

function FieldReserv() {

    const [form] = Form.useForm();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //UNIQUE ID OLUŞTURMA
    const generateUniqueId = () => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] % 1000000; 
    };

    //REZERVASYONU SHEETS'E KAYDET & EKLENEN REZERVASYONU SEPETE KAYDET & SEPET BADGE'İNİ GÜNCELLE
    const handleSubmit = async (values) => {
        const { fieldId, date, timeRange } = values;
        const field = fields.find(field => field.id === fieldId);
        const hours = timeRange[1].hour() - timeRange[0].hour();
        const total = hours * field.pricePerHour;
    
        const newReservation = {
          id: generateUniqueId(),
          username:  currentUser?.username,
          fieldName: field.name,
          date: date.format('YYYY-MM-DD'),
          startTime: timeRange[0].format('HH:mm'),
          endTime: timeRange[1].format('HH:mm'),
          totalPrice: total,
        };
    
        try {
          const basket = JSON.parse(localStorage.getItem("basket")) || [];
          basket.push(newReservation);
          localStorage.setItem("basket", JSON.stringify(basket));
          
          const newCount = basket.length;
          localStorage.setItem("basketCount", newCount);
          window.updateBasketCount();
          toast.success("Rezervasyon sepete eklendi");
          form.resetFields();
        } catch(error) {
          toast.error("Rezervasyon kaydedilemedi");
        }
      };


  return (
    <div className="reservation-wrapper">
      <Card className="reservation-card" title="Rezervasyon Yap" variant={false}>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>

          <Form.Item name="fieldId" label="Halı Saha" rules={[{ required: true }]}>
            <Select
              options={fields.map(field => ({ label: field.name, value: field.id }))}
              placeholder="Bir saha seçin"
            />
          </Form.Item>

          <Form.Item name="date" label="Tarih" rules={[{ required: true }]}>
            <DatePicker placeholder='Tarih Seçin'  style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="timeRange" label="Saat Aralığı" rules={[{ required: true }]}>
            <TimePicker.RangePicker 
            format="HH:mm"
            minuteStep={60} 
            showMinute={false}
            style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{backgroundColor:'green',fontSize:'17px'}} htmlType="submit" block>
              Rezervasyon Yap
            </Button>
          </Form.Item>

        </Form>

       
      </Card>
      <ToastContainer autoClose={1500} />
    </div>
  )
}

export default FieldReserv