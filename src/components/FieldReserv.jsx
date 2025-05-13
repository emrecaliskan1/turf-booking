import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Select, DatePicker, TimePicker, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { getFields } from '../services/fieldsApi';
import { getReservations } from '../services/reservations';
import '../css/FieldReserv.css'

function FieldReserv() {

  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const [availableHours, setAvailableHours] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //HALISAHALARI SHEETS'TEN ÇEKEREK SELECT EKRANINDA GÖSTERME.
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getFields();
        const parsedData = data.map((row) => ({
          id: row.id,
          name: row.name,
          pricePerHour: parseInt(row.price, 10),
        }));
        setFields(parsedData);
      } catch (error) {
        toast.error("Halı sahalar yüklenirken bir hata oluştu.");
      }
    };
    fetchFields();
  }, []);


  //UNIQUE ID OLUŞTURMA
  const generateUniqueId = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % 1000000; 
  };


  //REZERVASYON MÜSAİTLİK DURUMU KONTROLLERİ
  const handleFieldChange = async (fieldId, date) => {
    const selectedField = fields.find(field => field.id === fieldId);
    if (!selectedField || !date) return;
    console.log('Seçilen saha:', selectedField.name);
    console.log('Seçilen tarih:', date.format('YYYY-MM-DD'));
    try {
      const reservations = await getReservations(selectedField.name.trim(), date.format('YYYY-MM-DD'));

      // Saatlerin rezervasyonlu olup olmadığını kontrol et
      const reservedTimes = reservations.map(res => ({
        start: res.startTime,
        end: res.endTime,
      }));
      setAvailableHours(reservedTimes);
      } catch (error) {
        toast.error("Rezervasyon verileri alınırken hata oluştu");
      }
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

  //MÜSAİT OLMAYAN SAATLERİ DİSABLE OLARAK GÖSTERMEK İÇİN
  const disabledTime = () => {
    const reservedHours = availableHours.map(({ start, end }) => ({
      start: parseInt(start.split(':')[0], 10),
      end: parseInt(end.split(':')[0], 10),
    }));

    const disabledHours = [];
      for (let i = 0; i < 24; i++) {
        if (reservedHours.some(({ start, end }) => i >= start && i < end)) {
          disabledHours.push(i);
        }
    }
    return {
      disabledHours: () => disabledHours,
    };
  };


  return (
    <div className="reservation-wrapper">
      
      <Card className="reservation-card" title="Rezervasyon Yap" variant={false}>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>

          <Form.Item name="fieldId" label="Halı Saha" rules={[{ required: true }]}>
            <Select
              options={fields.map(field => ({ label: field.name, value: field.id }))}
              placeholder="Bir saha seçin"
               onChange={(fieldId) => form.setFieldsValue({ date: null, timeRange: null })}
            />
          </Form.Item>

          <Form.Item name="date" label="Tarih" rules={[{ required: true }]}>
            <DatePicker 
             onChange={(date) => handleFieldChange(form.getFieldValue('fieldId'), date)}
            placeholder='Tarih Seçin'  style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="timeRange" label="Saat Aralığı" rules={[{ required: true }]}>
            <TimePicker.RangePicker 
            format="HH:mm"
            minuteStep={60} 
            {...disabledTime()}
            style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{backgroundColor:'green',fontSize:'17px'}} htmlType="submit" block>
              Rezervasyon Yap
            </Button>
          </Form.Item>

        </Form>

       
      </Card>
      <ToastContainer autoClose={700} />
    </div>
  )
}

export default FieldReserv