import React from "react";
import { useNavigate } from "react-router-dom";
import './header.css';
import logo from "../assets/images/logoimage.png";
import { ReactComponent as LogoIcon } from '../assets/icons/profileicon.svg';

const Header = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
    navigate(`/${tab}`);
  };

  return (
    <header className="main-header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="header-tab-bar">
        <span
          className={`header-tab ${activeTab === "home" ? "active" : ""}`}
          onClick={() => handleTabClick("home")}
        >
          Tours
        </span>
        <span
          className={`header-tab ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => handleTabClick("hotels")}
        >
          Hotels
        </span>
        <span
          className={`header-tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => handleTabClick("requests")}
        >
          Requests
        </span>
      </nav>
      <div className="profile">
        <LogoIcon width={35} height={35} className="profile-icon" />
        <span className="profile-name">Profile</span>
      </div>
    </header>
  );
};

export default Header;
