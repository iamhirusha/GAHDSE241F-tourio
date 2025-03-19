import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../pages/homepage/homepage.css";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile-icon.png";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("tours");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="tab-bar">
          <span
            className={`tab ${activeTab === "tours" ? "active" : ""}`}
            onClick={() => handleTabClick("tours")}
          >
            Tours
          </span>
          <span
            className={`tab ${activeTab === "hotels" ? "active" : ""}`}
            onClick={() => handleTabClick("hotels")}
          >
            Hotels
          </span>
          <span
            className={`tab ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => handleTabClick("requests")}
          >
            Requests
          </span>
        </nav>
        <div className="profile">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
          <span className="profile-name">John Doe</span>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
