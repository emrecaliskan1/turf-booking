import axios from 'axios';

const URL ="https://v1.nocodeapi.com/emrecaliskan31/google_sheets/dXvKHjkDGOpRCUdY?tabId=fields"

// Halı saha bilgilerini Sheets'e ekleme
export const addField = async (fieldData) => {
  try {
    await axios.post(URL, fieldData);
  } catch (error) {
    console.error("Halı saha eklenemedi:", error);
  }
};

// Halı saha bilgilerini Sheets'ten çekme
export const getFields = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.data;
  } catch (error) {
    console.error("Halı saha verileri alınamadı:", error);
    return [];
  }
};
