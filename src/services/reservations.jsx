import axios from 'axios'

const URL = "https://sheetdb.io/api/v1/bhjvz1z32i565?sheet=reservations"

//REZERVASYON EKLE
export const addReservation = async (reservationData) => {
  try {
    const response = await axios.post(URL, { data: [reservationData] }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
  };

//REZERVASYONLARI ÇEK
export const getReservations = async (fieldName, date) => {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    const filteredData = data.filter(
      (reservation) => 
        reservation.fieldName.trim() === fieldName.trim() && reservation.date === date
    );
    return filteredData;
  } catch (error) {
    console.error('Hata:', error);
  }
};

//GİRİŞ YAPAN KULLANICININ REZERVASYONLARINI DÖNDÜR
export const getUserReservations = async (username) => {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    const filteredData = data.filter(
      (reservation) => reservation.username === username
    );
    return filteredData;
  } catch (error) {
    console.error('Rezervasyon verileri alınırken hata oluştu:', error);
  }
};

//REZERVASYON SİL
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`https://sheetdb.io/api/v1/bhjvz1z32i565/id/${reservationId}?sheet=reservations`);
    return response.data;
  } catch (error) {
    console.error('Rezervasyon silinirken hata oluştu:', error);
  }
};