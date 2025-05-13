import axios from "axios";

const URL = "https://sheetdb.io/api/v1/c3unhcp2d09tn"

export const getAllUsers = () => axios.get(URL);

//KULLANICI KAYIT ET
export const registerUser = (userData) => {
  const userWithId = {id: generateRandomId(), ...userData  };
  return axios.post(URL, userWithId);
};

//EMAIL VE USERNAME KONTROLÜ
export const checkUsernameEmail = async (value) => {
  const queryParam = type === "email" ? `email=${value}` : `username=${value}`;

  const response = await axios.get(`${URL}?${queryParam}`);
  const data = await response.json();

  return data.length > 0;  
};


//RANDOM ID ÜRETME
export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000); 
};

