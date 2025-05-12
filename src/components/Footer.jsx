import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import '../css/Footer.css';

const { Footer } = Layout;

const AppFooter = () => {
    
  return (
    <Footer style={{ backgroundColor: "#1a3622", padding: "10px 40px", textAlign: "center" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ backgroundColor: "#1a3622", justifyContent: "center" }}
      >
        <Menu.Item key="main">
          <Link to="/main" style={{ color: "#fff" }}>Ana Sayfa</Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link style={{ color: "#fff" }}>Hakkında</Link>
        </Menu.Item>

        <Menu.Item key="contact">
          <Link style={{ color: "#fff" }}>İletişim</Link>
        </Menu.Item>

      </Menu>

      <div style={{ marginTop: "10px", color: "#fff" }}>
        © {new Date().getFullYear()} Edirne Halı Saha Rezervasyonları. Tüm Hakları Saklıdır.
      </div>
    </Footer>
  );
};

export default AppFooter;
