import React from 'react';
import './tourpage.css';
import { useState } from "react";
import Header from "../../components/header";
import tourImage from '../../assets/images/img_kathmandu_1.jpg';

const TourPage = () => {
    const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="tour-page">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="top-section">
        <div className="image-container">
          <img src={tourImage} alt="Tour" />
        </div>
        <div className="info-container">
          <h1 className="tour-title">Explore the Alps</h1>
          <p className="tour-facilities">Facilities: Hotel, Meals, Guide</p>
          <p className="tour-description">
            Enjoy a breathtaking adventure through the snowy Alps with our all-inclusive package.
          </p>
          <p className="tour-price">$1,499</p>
          <button className="book-button">Book Tour</button>
        </div>
      </div>

      <div className="destinations-section">
        <div className="destinations-list">
          <div className="destination-item">
            <div className="bullet-point"></div>
            <div className="destination-content">
              <h3>Geneva</h3>
              <p>Beautiful lakeside views and Swiss culture.</p>
            </div>
          </div>
          <div className="destination-item">
            <div className="bullet-point"></div>
            <div className="destination-content">
              <h3>Zermatt</h3>
              <p>Home of the iconic Matterhorn mountain.</p>
            </div>
          </div>
          <div className="destination-item">
            <div className="bullet-point"></div>
            <div className="destination-content">
              <h3>Interlaken</h3>
              <p>Adventure capital with paragliding and rafting.</p>
            </div>
          </div>
          <div className="destination-item">
            <div className="bullet-point"></div>
            <div className="destination-content">
              <h3>Lucerne</h3>
              <p>Historic charm with a modern twist.</p>
            </div>
          </div>
          <div className="destination-item">
            <div className="bullet-point"></div>
            <div className="destination-content">
              <h3>Bern</h3>
              <p>Switzerland’s quaint and quiet capital.</p>
            </div>
          </div>
        </div>
        <div className="destinations-extra">
        </div>
      </div>
    </div>
  );
};

export default TourPage;
