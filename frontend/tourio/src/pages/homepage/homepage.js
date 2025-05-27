import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { ReactComponent as SearchIcon } from '../../assets/icons/ic_search.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/icon_add.svg';
import bannerImage from '../../assets/images/img_kathmandu_1.jpg';
import { useEffect} from 'react';
import Header from "../../components/header";
import TourComponent from "../../components/tourcomponent";
import ChatBot from "../../components/ChatBot/ChatBot";
import './homepage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
  };

  const navigate = useNavigate();

  const handleNavigateToTourRequest = () => {
    navigate('/addtourrequest');
  };

  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tours')
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(err => console.error(err));
  }, []);
  

  return (
    <div className="homepage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="page-content">
        <div className="banner-container">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-overlay">
            <h1 className="banner-title">Find Your Next Adventure</h1>
            <div className="search-bar-container">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                className="search-bar"
                placeholder="Search tours"
              />
              <button className="search-button" onClick={handleSearchSubmit}>
                <SearchIcon className="search-icon" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <ChatBot />
        </div>
      
        <div class="tour-section">
          <h2 class="tour-section-title">Explore Our Handcrafted Tour Plans</h2>
          <p class="tour-section-tagline">Explore, discover, and make memories that last forever.</p>
        </div>

        <div className="tours-container">
          <div className="tour-list">
            {tours.map((tour, index) => (
              <TourComponent
                key={index}
                image={tour.image}
                title={tour.title}
                destinations={tour.destinations}
                price={tour.price}
                preDefTourId={tour.preDefTourId}
              />
            ))}
          </div>
        </div>

        <div className="goto-reqpage-section">
          <div className="goto-reqpage-text">
            <h2 className="goto-reqpage-title">Can't find exact tour?</h2>
            <p className="goto-reqpage-subtext">Simply publish a tour request with your preferences.</p>
          </div>
          <button className="goto-reqpage-button" onClick={handleNavigateToTourRequest}>
            <AddIcon className="search-icon" /> Create Request
          </button>
        </div>

        <div class="tour-section">
          <h2 class="tour-section-title">Most Visited Destinations</h2>
          <p class="tour-section-tagline">Explore, discover, and make memories that last forever.</p>
        </div>

        <div className="tours-container">
          <div className="tour-list">
            {tours.map((tour, index) => (
              <TourComponent
                key={index}
                image={tour.image}
                title={tour.title}
                destinations={tour.destinations}
                price={tour.price}
              />
            ))}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
