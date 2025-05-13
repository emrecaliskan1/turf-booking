import axios from 'axios';

const URL ="https://sheetdb.io/api/v1/c3unhcp2d09tn?sheet=fields"

// Halı saha bilgilerini Sheets'e ekleme
export const addField = async (fieldData) => {
  try {
    const formattedData = {
      data: [
        {
          id: fieldData.id,
          name: fieldData.name,
          price: fieldData.price
        }
      ]
    };
        
    const response = await axios.post(URL, formattedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    } catch (error) {
        throw new Error(`Halı saha eklenemedi`);
    }
};


// Halı saha bilgilerini Sheets'ten çekme
export const getFields = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Halı saha verileri alınamadı:",error);
    return [];
  }
};