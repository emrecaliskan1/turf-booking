import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { registerUser, getAllUsers,checkIfUserExists } from "../services/auth";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import img from '/images/saha2.jpg'

const RegisterPage = () => {

  const navigate = useNavigate();

  //Kullanıcı Adı ve E-Posta KONTROLÜ & YENİ KULLANICIYI KAYDETME İŞLEMİ
  const onFinish = async (values) => {
    try {
      const { username, email, password } = values;
      
      const userExists = await checkIfUserExists(username, email);
      if (userExists) return;
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (error) {
      toast.error("Kayıt sırasında bir hata oluştu!");
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
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Üye Ol</h2>

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

        <Button style={{marginLeft:'135px',backgroundColor:'lightcyan'}}> <Link to="/login" style={{color: "black" ,marginRight:'7px'}}>Giriş Yap</Link></Button>

      </div>

      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default RegisterPage;
