import React, { useEffect, useState } from "react";
import { Badge, Layout, Menu } from "antd";
import { ShoppingCartOutlined , UserOutlined } from '@ant-design/icons';
import { Link, useLocation , useNavigate } from "react-router-dom";
import '../css/Navbar.css'

const { Header } = Layout;

const Navbar = () => {
  
  const location = useLocation();
  const [basketCount, setBasketCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  

   useEffect(() => {
    const storedCount = JSON.parse(localStorage.getItem("basketCount")) || 0;
    setBasketCount(storedCount);
     const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user.username);
    }
  }, []);


  // SEPET SAYISINI GÜNCELLE
  const updateBasketCount = () => {
    const storedCount = JSON.parse(localStorage.getItem("basketCount")) || 0;
    setBasketCount(storedCount);
  };

  // Sepet sayısını güncelleme işlemini dinle
  useEffect(() => {
    window.updateBasketCount = updateBasketCount;
  }, []);
  

  //ÇIKIŞ YAP
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("basket");
    localStorage.removeItem("basketCount");
    setCurrentUser(null); 
    setBasketCount(0);
    navigate("/login");
  };

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

        <Menu.Item key="/fields">
          <Link to="/fields">Sahalar</Link>
        </Menu.Item>

        <Menu.Item key="/reservations">
          <Link to="/reservations">Rezervasyonlar</Link>
        </Menu.Item>

        <Menu.Item key="/basket">
          <Link to="/basket"> 
           
            Sepet 
            <Badge count={basketCount} showZero offset={[5, -5]}>
              <ShoppingCartOutlined style={{ fontSize: '18px', color: '#fff' }} />
            </Badge></Link>
        </Menu.Item>

         {currentUser && (
          <Menu.Item key="user" style={{ display: 'flex', alignItems: 'center',marginLeft:'500px' }}>
            <UserOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '3px' }} />
            <span style={{ color: '#fff' }}>{currentUser}</span>
          </Menu.Item>
        )}

        

        <Menu.Item key="/logout">
          <Link to="/login"
          style={{marginLeft:'26px'}} onClick={handleLogout}>Çıkış Yap</Link>
        </Menu.Item>

      </Menu>
    </Header>
  );
};

export default Navbar;
