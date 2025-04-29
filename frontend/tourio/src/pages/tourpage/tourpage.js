import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import './tourpage.css';

const TourPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then(res => res.json())
      .then(data => setTour(data))
      .catch(err => console.error('Failed to fetch tour details', err));
  }, [id]);

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="tour-page">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="top-section">
        <div className="image-container">
          <img src={tour.image} alt="Tour" />
        </div>
        <div className="info-container">
          <h1 className="tour-title">{tour.title}</h1>
          <p className="tour-facilities">Facilities: {tour.facilities}</p>
          <p className="tour-description">Explore the wonders of this region with our carefully curated package.</p>
          <p className="tour-price">Rs. {tour.price}</p>
          <button className="book-button">Book Tour</button>
        </div>
      </div>

      <h1 className="tour-title">Destinations</h1>
      <p className="tour-facilities">Places that you explore</p>
      <div className="destinations-section">
        <div className="destinations-list">
          {tour.destinations.map((dest, index) => (
            <div className="destination-item" key={index}>
              <div className="bullet-point"></div>
              <div className="destination-content">
                <h3>{dest.name}</h3>
                <p>Location link: <a href={dest.mapUrl} target="_blank" rel="noopener noreferrer">{dest.mapUrl}</a></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPage;
