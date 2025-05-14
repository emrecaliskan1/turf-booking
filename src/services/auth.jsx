import axios from "axios";
import { toast } from 'react-toastify';

const URL = "https://sheetdb.io/api/v1/9slreximbznsz"

//TÜM KULLANICILARI ÇEK
export const getAllUsers = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

//KULLANICI KAYIT ET
export const registerUser = (userData) => {
  const userWithId = {id: generateRandomId(), ...userData  };
  return axios.post(URL, userWithId);
};

//RANDOM ID ÜRETME
export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000); 
};

//KULLANICI DOGRULAMA
export const validateUser = async (username, email, password) => {
  try {
    const users = await getAllUsers();
    const user = users.find((user) => user.username === username || user.email === email);
    if (!user) {
      toast.error("Kullanıcı bulunamadı.");
      return null;
    }
    if (user.password !== password) {
      toast.error("Kullanıcı adı ya da şifre yanlış!");
      return null;
    }
    return user;
  } catch (error) {
    console.log(error)
  }
};

// Kullanıcı var mı kontrolü
export const checkIfUserExists = async (username, email) => {
  try {
    const users = await getAllUsers();
    const isUsernameTaken = users.some((user) => user.username === username);
    const isEmailTaken = users.some((user) => user.email === email);

    if (isUsernameTaken) {
      toast.error("Bu kullanıcı adı zaten mevcut!");
      return true;
    }
    if (isEmailTaken) {
      toast.error("Bu e-posta zaten mevcut!");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error)
  }
};

