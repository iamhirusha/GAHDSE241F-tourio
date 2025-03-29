import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as SearchIcon } from '../../assets/icons/ic_search.svg';
import Header from "../../components/header";
import TourComponent from "../../components/tourcomponent";
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

  const tours = [
    {
      image: require('../../assets/images/img_bali_1.jpg'),
      title: "Beach Paradise",
      destinations: "Hawaii, Maldives, Bali",
      price: "$999"
    },
    {
      image: require('../../assets/images/img_rome_1.jpg'),
      title: "European Escape",
      destinations: "Paris, London, Rome",
      price: "$1299"
    },
    {
      image: require('../../assets/images/img_sigiriya_1.png'),
      title: "Roaming Countryside",
      destinations: "Dambulla, Sri Lanka",
      price: "$899"
    },
    {
      image: require('../../assets/images/img_kathmandu_1.jpg'),
      title: "Mountain Trekking",
      destinations: "Nepal, Tibet",
      price: "$799"
    },
  ];

  return (
    <div className="homepage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="page-content">
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
