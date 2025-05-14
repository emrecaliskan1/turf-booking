import React, { useEffect, useState } from "react";
import { Badge, Layout, Menu } from "antd";
import { ShoppingCartOutlined , UserOutlined } from '@ant-design/icons';
import { Link, useLocation , useNavigate } from "react-router-dom";
import { getBasketByUser } from "../services/basketApi";
import '../css/Navbar.css'

const { Header } = Layout;

const Navbar = () => {
  
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [basketCount, setBasketCount] = useState(0);
  const navigate = useNavigate();

   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user.username);
      fetchBasketCount(user.id);
    }
  }, []);

  //ÇIKIŞ YAP
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); 
    setBasketCount(0);
    navigate("/login");
  };

  //SEPET BADGE'İ GÜNCELLEME
  const fetchBasketCount = async (userId) => {
    try {
      const basketItems = await getBasketByUser(userId);
      setBasketCount(basketItems.length);
    }catch (error) {
      console.error(error);
    }};


  return (

    <Header style={{ backgroundColor: "#1a3622", padding: "0 40px" }}>

      <div className="logo" style={{ float: "left", color: "#fff", fontSize: 20, fontWeight: "bold", marginRight: "40px" }}>
        <Link to="/main" style={{ color: "#fff" }}>Edirne Halı Saha Rezervasyonları</Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        style={{ backgroundColor: "#1a3622", flex: 1 }}
      >
        <Menu.Item key="/">
          <Link to="/main">Ana Sayfa</Link>
        </Menu.Item>

        <Menu.Item key="/reservations">
          <Link to="/reservations">Rezervasyonlar</Link>
        </Menu.Item>

        <Menu.Item key="/basket" style={{marginLeft:'620px'}}>
          <Link to="/basket"> 
            Sepet 
            <Badge count={basketCount} offset={[5, -2]} style={{ backgroundColor: 'red' }}>
              <ShoppingCartOutlined style={{ fontSize: '18px', color: '#fff', marginLeft: '5px' }} />
            </Badge>
          </Link>
        </Menu.Item>

         {currentUser && (
          <Menu.Item key="user" style={{ display: 'flex', alignItems: 'center',marginLeft:'5px' } }>
             <Link to="/profile"> 
            <UserOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '3px' }} />
            <span style={{ color: '#fff' }}>{currentUser}</span>
            </Link>
          </Menu.Item>
        )}

        <Menu.Item key="/logout">
          <Link to="/login"
          style={{marginLeft:'1px'}} onClick={handleLogout}>Çıkış Yap</Link>
        </Menu.Item>

      </Menu>
    </Header>
  );
};

export default Navbar;