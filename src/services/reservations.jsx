import axios from 'axios'

const URL = "https://sheetdb.io/api/v1/m7stvofvne91b?sheet=reservations"

//REZERVASYON EKLE
export const addReservation = async (reservationData) => {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [reservationData] }),
    });  
    return await response.json();
  };



export const getReservations = async (fieldName, date) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    // Seçilen saha ve tarihe ait rezervasyonları filtrele
    const filteredData = data.filter(
      (reservation) => 
        reservation.fieldName === fieldName && reservation.date === date
    );
    return filteredData;

  } catch (error) {
    console.error('Hata:', error);
  }
};


//GİRİŞ YAPAN KULLANICININ REZERVASYONLARINI DÖNDÜR
export const getUserReservations = async (username) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

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
    const response = await axios.delete(`https://sheetdb.io/api/v1/m7stvofvne91b/id/${reservationId}?sheet=reservations`);
    return response.data;
  } catch (error) {
    console.error('Rezervasyon silinirken hata oluştu:', error);
  }
};