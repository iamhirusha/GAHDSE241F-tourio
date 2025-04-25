import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import HotelComponent from "../../components/hotelcomponent";
import { useEffect} from 'react';
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

    const [hotels, setTours] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/hotels')
          .then(res => res.json())
          .then(data => setTours(data))
          .catch(err => console.error(err));
      }, []);

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
                  image={hotel.hotelImage}
                  name={hotel.hotelName}
                  description={hotel.hotelDescription}
                  price={hotel.hotelAddress}
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
