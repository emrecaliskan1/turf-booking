import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import {  getAllUsers } from "../services/auth"; 
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import img from '/images/saha2.jpg';

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error("Kullanıcılar yüklenirken bir hata oluştu!");
      }
    };
    fetchUsers();
  }, []);



  const onFinish = async (values) => {
    const { username, email, password } = values;

    // Kullanıcı adı veya e-posta ile eşleşen kullanıcıyı bulma
    const user = users.find(
      (user) => user.username === username || user.email === email
    );

    if (!user) {
      toast.error("Kullanıcı   bulunamadı.");
      return;
    }
    if (user.password !== password) {
      toast.error("Kullanıcı adınız ya da şifreyiz yanlış !");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    toast.success("Giriş başarılı!");
    navigate("/main"); 
  };


  return (
    <div
      style={{
        position: "sticky",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 375,
          padding: 30,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 10,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Giriş Yap</h2>

        <Form layout="vertical" onFinish={onFinish} initialValues={{ username: "", email: "", password: "" }}>
          <Form.Item
            label="Kullanıcı Adı :"
            name="username"
            rules={[{ required: true, message: "Kullanıcı adı zorunludur!" }]}
          >
            <Input placeholder="Kullanıcı adı" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifre zorunludur" }]}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ backgroundColor: "green" }}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>

        <Button style={{marginLeft:'110px',backgroundColor:'lightcyan'}}> <Link to="/" style={{color: "black" ,marginRight:'7px'}}>Hesabın Yok mu?</Link></Button>
      </div>

      <ToastContainer autoClose={2000} />
    </div>  
  );
};

export default LoginPage;