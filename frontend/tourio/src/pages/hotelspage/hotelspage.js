import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import HotelComponent from "../../components/hotelcomponent";
import { ReactComponent as SearchIcon } from '../../assets/icons/ic_search.svg';
import './hotelspage.css';

const HotelsPage = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  const [searchQuery, setSearchQuery] = useState(""); 
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchSubmit = () => {
      console.log("Searching for:", searchQuery);
    };

  const hotels = [
    {
      image: require('../../assets/images/img_bali_1.jpg'),
      name: "Hotel Paradise",
      location: "Luxury Hotel with precious services and adventures. Bali, Indonesia",
      price: "$120 per night"
    },
    {
      image: require('../../assets/images/img_bali_1.jpg'),
      name: "Hotel Royale",
      location: "Luxury Hotel with precious services and adventures. Paris, France",
      price: "$180 per night"
    },
    {
      image: require('../../assets/images/img_bali_1.jpg'),
      name: "Sunset Resort",
      location: "Luxury Hotel with precious services and adventures. Maldives",
      price: "$250 per night"
    },
    {
      image: require('../../assets/images/img_bali_1.jpg'),
      name: "Oceanview Retreat",
      location: "Luxury Hotel with precious services and adventures. Hawaii, USA",
      price: "$220 per night"
    }
  ];

  return (
    <div className="hotelspage">
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

        <div class="hotel-section">
          <h2 class="hotel-section-title">Explore Hotels</h2>
          <p class="hotel-section-tagline">Explore, discover, and make memories that last forever.</p>
        </div>

        <div className="hotels-container">
            <div className="hotel-list">
              {hotels.map((hotel, index) => (
                <HotelComponent
                  key={index}
                  image={hotel.image}
                  name={hotel.name}
                  location={hotel.location}
                  price={hotel.price}
                />
              ))}
            </div>
          </div>
        <Outlet />
      </div>
    </div>
  );
};

export default HotelsPage;
