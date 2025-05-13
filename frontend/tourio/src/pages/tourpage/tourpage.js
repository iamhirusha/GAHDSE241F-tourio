import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import './tourpage.css';
import bannerImage from '../../assets/images/img_kathmandu_1.jpg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

  const handleBookTour = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tour }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Booking payment failed', error);
    }
  };

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="tour-page">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="top-section">
        <div className="image-container">
          <img src={bannerImage} alt="Tour image displays here" />
        </div>
        <div className="info-container">
          <h1 className="tourpg-title">{tour.title}</h1>
          <p className="tourpg-facilities">Facilities: {tour.facilities}</p>
          <p className="tourpg-description">Explore the wonders of this region with our carefully curated package.</p>
          <p className="tourpg-price">Rs. {tour.price}</p>
          <button className="book-button" onClick={handleBookTour}>Book Tour</button>
        </div>
      </div>

      <div className="destinations-section">
        <div className="destinations-list">
          <h1 className="tourpg-title">Destinations</h1>
          <p className="tourmap-text">Places You are About to Experience</p>
          {tour.destinations.map((dest, index) => (
            <div className="destination-item" key={index}>
              <div className="bullet-point"></div>
              <div className="destination-content"> 
                <h3> Destination {index+1}- {dest.name}</h3>
                <p>Latitude: {dest.lat} - Longitude: {dest.lng}</p>
                <p>
                  <a
                    href={`https://www.google.com/maps?q=${dest.lat},${dest.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#093768', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                  ⚲ View on Google Maps
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="destinations-map">
          <h1 className="tourpg-title">Visualize Your Adventure!</h1>
          <p className="tourmap-text">Your Path, Mapped - Discover Your Upcoming Stops</p>
          <MapContainer center={[7.8731, 80.7718]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {tour.destinations.map((dest, index) => (
              <Marker key={index} position={[dest.lat, dest.lng]}>
                <Popup>{dest.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
