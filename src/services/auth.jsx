import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const URL = "https://sheetdb.io/api/v1/m7stvofvne91b"


export const getAllUsers = () => axios.get(URL);


//KULLANICI KAYIT ET
export const registerUser = (userData) => {
  const userWithId = {id: generateRandomId(), ...userData  };
  return axios.post(URL, userWithId);
};

//EMAIL KONTROLÜ
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

