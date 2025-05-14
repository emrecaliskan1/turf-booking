import React from "react";
import { Form, Input, Button } from "antd";
import { validateUser } from "../services/auth"; 
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import img from '/images/saha2.jpg';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, email, password } = values;
    const user = await validateUser(username, email, password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/main"); 
    }
  };


  return (
    <div
      style={{position: "sticky",width: "100%",height: "100vh",backgroundImage: `url(${img})`,backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat",}}>
      <div
        style={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",width: 375,padding: 30,boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",borderRadius: 12,backgroundColor: "rgba(255, 255, 255, 0.8)",zIndex: 10,}}>
        
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