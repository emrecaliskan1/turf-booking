import axios from 'axios'

const URL = "https://sheetdb.io/api/v1/nld0dzli96m4u?sheet=reservations"

export const addReservation = async (reservationData) => {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [reservationData] }),
    });
  
    if (!response.ok) {
      console.log(error)
    }
  
    return await response.json();
  };

export const getReservations = () => {
    return axios.get(API_URL);
};