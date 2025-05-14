import axios from "axios";

const URL = "https://sheetdb.io/api/v1/ag380wjo0nyx6"

export const getAllUsers = () => axios.get(URL);

//KULLANICI KAYIT ET
export const registerUser = (userData) => {
  const userWithId = {id: generateRandomId(), ...userData  };
  return axios.post(URL, userWithId);
};

//RANDOM ID ÜRETME
export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000); 
};

