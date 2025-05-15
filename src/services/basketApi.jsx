import axios from 'axios';

const URL = 'https://sheetdb.io/api/v1/vx8mvvhmwu325';

//REZERVASYON FORMUNDAN KULLANICININ SEPETİNE EKLEME
export const addToBasket = async (reservation) => {
  try {
    const response = await axios.post(`${URL}?sheet=basket`, { data: reservation });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

//KULLANICININ SEPETİNİ ÇEKME
export const getBasketByUser = async (userId) => {
  try {
    const response = await axios.get(`${URL}?sheet=basket`);
    const data = response.data;
    const filteredData = data.filter((basketItem) => basketItem.userId == userId);
    return filteredData;
  } catch (error) {
    console.error(error);
  }
};

//SEPETTEN REZERVASYONU KALDIRMA
export const removeFromBasket = async (reservationId) => {
try {
    const response = await axios.delete(`${URL}/id/${reservationId}?sheet=basket`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//ÖDEME YAPTIKTAN SONRA KULLANICININ SEPETİNİ SİLME
export const deleteBasket = async (userId) => {
try {
    const basketItems = await getBasketByUser(userId);
    for (const item of basketItems) {
      const response = await axios.delete(`${URL}/id/${item.id}?sheet=basket`);
    }
  } catch (error) {
    console.error(error);
  }
};