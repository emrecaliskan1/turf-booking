import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  return (
    <Header style={{ backgroundColor: "#006400", padding: "0 40px" }}>
      <div className="logo" style={{ float: "left", color: "#fff", fontSize: 20, fontWeight: "bold", marginRight: "40px" }}>
        <Link to="/main" style={{ color: "#fff" }}>Halısaha Rezervasyonları</Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        style={{ backgroundColor: "#006400", flex: 1 }}
      >
        <Menu.Item key="/">
          <Link to="/">Ana Sayfa</Link>
        </Menu.Item>
        <Menu.Item key="/fields">
          <Link to="/fields">Sahalar</Link>
        </Menu.Item>
        <Menu.Item key="/reservations">
          <Link to="/reservations">Rezervasyonlar</Link>
        </Menu.Item>
        <Menu.Item key="/logout">
          <Link to="/login">Çıkış Yap</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
