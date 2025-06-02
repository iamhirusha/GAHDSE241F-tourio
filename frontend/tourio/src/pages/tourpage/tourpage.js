import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import axios from 'axios';
import './tourpage.css';
import bannerImage from '../../assets/images/img_kathmandu_1.jpg';
import Footer from "../../components/footer";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  const { id: tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  // State for feedback form
  const [starCount, setStarCount] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [tourType, setTourType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${tourId}`)
      .then(res => res.json())
      .then(data => setTour(data))
      .catch(err => console.error('Failed to fetch tour details', err));
  }, [tourId]);

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

    // feedback form submit
    const handleTourFeedbackSubmit = async (e) => {
      e.preventDefault();

      if (!user) {
        alert('User not authenticated.');
        return;
      }

      if (!starCount || !tourType || !feedbackText.trim()) {
        alert("Please fill all fields.");
        return;
      }

      const token = await user.getIdToken();

      const payload = {
        starCount,
        tourType,
        feedbackText,
        tourId,
      };

      try {
        const response = await axios.post(
          'http://localhost:5000/api/feedback',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Feedback submitted successfully!');
        setStarCount(0);
        setHoveredStar(0);
        setTourType('');
        setFeedbackText('');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback.');
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
      
      <div className="tour-feedback-container">
        <p className="Tour-Feedback-Title">Share Your Experience</p>
        <p className="Tour-Feedback-Subtitle">Select stars according to your satisfaction</p>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoveredStar || starCount) ? 'filled' : ''}`}
              onClick={() => setStarCount(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            >
            ★
            </span>
          ))}
        </div>

        <div className="tour-type-buttons">
          <p className='feedback-tour-type-text'>Select the tour type: </p>
          {['Solo-Tour', 'Couple-Tour', 'Family-Tour', 'Friends-Tour'].map((type) => (
            <button
              key={type}
              className={`tour-type-selector ${tourType === type ? 'selected' : ''}`}
              onClick={() => setTourType(type)}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>

        <textarea
          className="tour-feedback-textarea"
          placeholder="Write your feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          rows={5}
        />

        <button className="tour-feedback-submit-button" onClick={handleTourFeedbackSubmit}>
          Publish Feedback
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TourPage;
