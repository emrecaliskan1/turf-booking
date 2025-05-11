import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import '../css/Navbar.css'

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); 
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
          <Link to="/basket">Sepet</Link>
        </Menu.Item>

        

        <Menu.Item key="/logout">
          <Link to="/login"
          style={{marginLeft:'600px'}} onClick={handleLogout}>Çıkış Yap</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
