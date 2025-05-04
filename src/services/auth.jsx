import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const URL = "https://sheetdb.io/api/v1/f85n9zksb2vjm"


export const getAllUsers = () => axios.get(URL);


export const registerUser = (userData) => {
  const userWithId = {id: generateRandomId(), ...userData  };
  return axios.post(URL, userWithId);
};

export const checkUsernameEmail = async (value) => {
  const queryParam = type === "email" ? `email=${value}` : `username=${value}`;

  const response = await axios.get(`${URL}?${queryParam}`);
  const data = await response.json();

  // Eğer veri varsa (yani aynı kullanıcı adı ya da e-posta mevcutsa) true döndür
  return data.length > 0;  
};


export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000); 
};

