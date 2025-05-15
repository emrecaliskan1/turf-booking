import React, { useEffect, useState } from 'react'
import { Card, Form, Select, DatePicker, TimePicker, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { getFields } from '../services/fieldsApi';
import { getReservations } from '../services/reservations';
import { addToBasket } from '../services/basketApi';
import { useLocation } from 'react-router-dom';
import '../css/FieldReserv.css'

const FieldReserv = () => {

  const location = useLocation();
  const selectedFieldFromNav = location.state?.selectedField;
  const [startTime, setStartTime] = useState(null);
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
        if (selectedFieldFromNav) {
          form.setFieldsValue({ fieldId: selectedFieldFromNav.id });
        }
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


  //KULLANICININ SEÇTİĞİ SAHA VE TARİHE GÖRE DOLU SAAT ARALIKLARINI BELİRLE
  const handleFieldChange = async (fieldId, date) => {
    const selectedField = fields.find(field => field.id === fieldId);
    if (!selectedField || !date) return;
    try {
      const reservations = await getReservations(selectedField.name.trim(), date.format('YYYY-MM-DD'));
      const reservedTimes = reservations.map(res => ({
        start: res.startTime,
        end: res.endTime,
      }));
      setAvailableHours(reservedTimes);
      }catch (error) {
        toast.error("Rezervasyon verileri alınırken hata oluştu");
      }
};

  

  //REZERVASYONU SEPETE KAYDET 
  const handleSubmit = async (values) => {
    const { fieldId, date, start, end } = values;
    const field = fields.find((field) => field.id === fieldId);
    const startTime = start.format('HH:mm');
    const endTime = end.format('HH:mm');
    const hours = end.hour() - start.hour();
    const total = hours * field.pricePerHour;

    const newBasket = {
      id: generateUniqueId(),
      userId: currentUser?.id,
      fieldName: field.name,
      date: date.format('YYYY-MM-DD'),
      startTime: startTime,
      endTime: endTime,
      totalPrice: total,
    };
    try {
      await addToBasket(newBasket);
      form.resetFields();
      toast.success("Rezervasyon sepete eklendi");
    } catch (error) {
      toast.error("Rezervasyon kaydedilemedi");
    }
};

  //TARİH VE SAHAYA GÖRE DOLU SAAT ARALIKLARINI ENGELLE (Saat aralıklarını availableHours ile karşılaştırır.)
  const disabledTime = (isStart) => {
    const disabledHours = [];
    for (let i = 0; i < 24; i++) {
      const isDisabled = availableHours.some(({ start, end }) => {
        const startHour = parseInt(start.split(':')[0], 10);
        const endHour = parseInt(end.split(':')[0], 10);
        return isStart ? (i >= startHour && i < endHour) : (i >= startHour && i <= endHour);
      });
      if (isDisabled) disabledHours.push(i);
    }
    return disabledHours;
    };


  //BİTİŞ SAATİ SEÇME KISMINDAKİ DISABLE AYARLARI
  const getDisabledEndHours = () => {
    if (!startTime) return [];
    const startHour = startTime.hour();
    const disabledHours = [];

    for (let hour = 0; hour < 24; hour++) {
      if (hour <= startHour) {
        disabledHours.push(hour);
        continue;}

      // Eğer bitiş saati seçildiğinde, başlangıç-bitiş aralığı herhangi bir rezervasyonla çakışıyorsa disabled
      const conflict = availableHours.some(({ start, end }) => {
        const resStart = parseInt(start.split(':')[0], 10);
        const resEnd = parseInt(end.split(':')[0], 10);
        return !(hour <= resStart || startHour >= resEnd);
    });
    if (conflict) {
      disabledHours.push(hour);
    }
  }
  return disabledHours;
  };


  return (
    <div className="reservation-wrapper">
      
      <Card className="reservation-card" title="Rezervasyon Yap" variant={false}>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>

          <Form.Item name="fieldId" label="Halı Saha" rules={[{ required: true }]}>
            <Select
              options={fields.map(field => ({ label: field.name, value: field.id }))}
              placeholder="Bir saha seçin"
              onChange={() => form.setFieldsValue({ date: null, timeRange: null })}
              defaultValue={selectedFieldFromNav?.id}
            />
          </Form.Item>

          <Form.Item name="date" label="Tarih" rules={[{ required: true }]}>
            <DatePicker 
             onChange={(date) => handleFieldChange(form.getFieldValue('fieldId'), date)}
             placeholder='Tarih Seçin'  style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="start" label="Başlangıç Saati" rules={[{ required: true }]}>
            <TimePicker
              format="HH:mm"
              minuteStep={60}
              onChange={(time) => setStartTime(time)}
              disabledHours={() => disabledTime(true)}
              style={{ width: '100%' }}/>
          </Form.Item>

          <Form.Item name="end" label="Bitiş Saati" rules={[{ required: true }]}>
            <TimePicker
              format="HH:mm"
              minuteStep={60}
              disabled={!startTime}
              disabledHours={getDisabledEndHours}
              style={{ width: '100%' }}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{backgroundColor:'green',fontSize:'17px'}} htmlType="submit" block>
              Rezervasyon Yap
            </Button>
          </Form.Item>

        </Form>

       
      </Card>
      <ToastContainer autoClose={500} />
    </div>
  )
}

export default FieldReserv