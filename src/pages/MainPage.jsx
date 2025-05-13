import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getFields } from '../services/fieldsApi';
import { useNavigate } from 'react-router-dom';
import { Button, Card, DatePicker, Input, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import { getReservations } from '../services/reservations';
import '../css/FieldReserv.css'
import '../css/MainPage.css'
import AppFooter from '../components/Footer';

function MainPage() {

   const [fields, setFields] = useState([]);
   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedField, setSelectedField] = useState(null);
   const [reservedTimes, setReservedTimes] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredFields, setFilteredFields] = useState([]);
   const navigate = useNavigate();

   //HALI SAHALARI DB'DEN ÇEK
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const data = await getFields();
                const parsedData = data.map((row) => ({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                }));
                setFields(parsedData);
                setFilteredFields(parsedData)
            } catch (error) {
                toast.error("Halı sahalar yüklenirken bir hata oluştu.", error);}
        };
        fetchFields();
    }, []);


  //SAHA ARAMA
  const handleSearch = (value) => {
        setSearchTerm(value);
        const filtered = fields.filter((field) =>
          field.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredFields(filtered);
  };


  const handleDateChange = async (date) => {
    setSelectedDate(date);
    try {
        const allReservations = await Promise.all(
            fields.map(field => getReservations(field.name.trim(), date.format('YYYY-MM-DD')))
        );
        const availableFields = fields.filter((field, index) => allReservations[index].length === 0);
        if (availableFields.length === 0) {
            toast.warning('Seçilen tarihte uygun saha bulunmamaktadır.');
        }
        toast.info("Filtrelenecek Tarihi Seçtiniz...")
    } catch (error) {
        toast.error('Rezervasyon verileri alınırken hata oluştu.');
    } 
  };

  
  //DOLULUK ORANINI GÖR TUŞU
  const handleShowDetails = async (field) => {
    try {
      const reservations = await getReservations(field.name, selectedDate.format('YYYY-MM-DD'));
      setSelectedField(field);
      setReservedTimes(reservations.map(res => `${res.startTime} - ${res.endTime}`));
      setIsModalVisible(true);
    } catch (error) {
      toast.error('Detayı görmek için önce tarih seçiniz!');
    }
  };

  //MODAL'İ AÇ KAPA
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

   //REZERVASYON YAP TUŞUNA TIKLANDIĞINDA SAYFAYA YÖNLENDİR.
  const handleReservation = () => {
    navigate(`/reservations`);
  };

  return (
    <>
      <Navbar/>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px',marginRight:'70px' ,gap:'50px'}}>
        <Input.Search
          placeholder="Halı Saha Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => handleSearch(searchTerm)}
          enterButton
          style={{ width: '385px', height: '35px' }}
        />
          <DatePicker onChange={handleDateChange} placeholder='Tarih Seçin' style={{ width: '300px',height:'35px',marginRight:'35px' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {filteredFields.map((field) => (

        <Card
          key={field.id}
          title={field.name}
          style={{ width: 300, margin: '10px', textAlign: 'center', borderRadius: '10px' }}
          hoverable>
            <p style={{ fontSize: '15px' }}>{field.price} TL / Saat</p>

          <Button 
            className='custom-button'
            type="primary" 
            onClick={() => handleReservation(field.id)} 
            style={{ marginTop: '10px'}}>
            Rezervasyon Yap
          </Button>

          <Button
                  style={{ marginTop: '10px',marginLeft:'10px' }}
                  onClick={() => handleShowDetails(field)}>
                  Doluluk Saatlerini Gör
          </Button>
          
        </Card>
      ))}
    </div>

    <Modal
      title={`Dolu Saatler:  ${selectedField?.name}`}
      visible={isModalVisible}
      onCancel={handleModalClose}
      footer={null}>
        {reservedTimes.length > 0 ? (reservedTimes.map((time, index) => (
          <p key={index}>{time}</p>)))
          : (<p>Bu tarihte dolu saat bulunmamaktadır.</p>)}
    </Modal>

  <AppFooter/>
  <ToastContainer  autoClose={1000}/>
  
  </>
  )
}

export default MainPage