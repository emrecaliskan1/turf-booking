import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { registerUser, getAllUsers } from "../services/auth"; // API fonksiyonlarını buradan alıyoruz
import img from '../images/saha2.jpg'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  //KULLANICILARI ÇEKME FONKSİYONU.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data); 
      } catch (error) {
        message.error("Kullanıcılar yüklenirken bir hata oluştu!");
      }
    };
    fetchUsers();
  }, []);


  // Aynı kullanıcı adı veya e-posta olup olmadığını kontrol eden fonksiyon
  const checkIfUserExists = (username, email) => {
    const isUsernameTaken = users.some((user) => user.username === username);
    const isEmailTaken = users.some((user) => user.email === email);

    if (isUsernameTaken) return "Bu kullanıcı adı zaten alınmış.";
    if (isEmailTaken) return "Bu e-posta zaten kayıtlı.";
    return null; 
  };


  const onFinish = async (values) => {
    // Kullanıcı adı ve e-posta kontrolü
    const validationError = checkIfUserExists(values.username, values.email);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    try {
      // Yeni kullanıcıyı kaydetme
      await registerUser(values);
      toast.success("Kullanıcı başarıyla oluşturuldu!");
      navigate("/login")
    } catch (error) {
      toast.error("Kullanıcı oluşturulurken bir hata oluştu.");
    }
  };


  return (
    
    <div
      style={{
        position: "sticky", 
        width:"100%",
        height: "100vh", 
        backgroundImage:`url(${img})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", 
          width:375,
          padding: 30,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          zIndex: 10, 
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Kullanıcı Oluştur</h2>

        <Form layout="vertical" onFinish={onFinish} initialValues={{ username: "", email: "", password: "" }}>

          <Form.Item label="Kullanıcı Adı" name="username" rules={[{ required: true, message: "Kullanıcı adı zorunludur!" }]}>
            <Input placeholder="Kullanıcı adı" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email zorunludur!" }, { type: "email", message: "Geçersiz email!" }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifre zorunludur" }, { min: 6, message: "Şifre en az 6 karakter olmalı" }]}>
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block 
             style={{ backgroundColor: "green" }}>
              Kayıt Ol
            </Button>
          </Form.Item>

        </Form>

      </div>

      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default RegisterPage;
