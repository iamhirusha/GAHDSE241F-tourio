
import React, { useState } from 'react';
import { useEffect } from 'react';
import './profilepage.css';
import TourComponent from "../../components/tourcomponent";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about');

  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tours')
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        

        {/* Main Content */}
        <div className="profile-content">
          {/* Left Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-image-container">
              <img 
                src="d.jpg" 
                alt="Dilshan Sathsara" 
                className="profile-image" 
              />
              <p className="caption">Profile</p>
            </div>

            <div className="locations">
              <div className="location-card">
                <div className="location-header">
                  <span className="location-name">Ella</span>
                  <span className="location-tag primary-tag">Primary</span>
                </div>
                <div className="location-address">
                  <p>Badulla District of Uva Province</p>
                  <p> Sri Lanka(78.212.112.51)</p>
                </div>
              </div>

              <div className="location-card">
                <div className="location-header">
                  <span className="location-name">Sigiriya</span>
                  <span className="location-tag secondary-tag">Secondary</span>
                </div>
                <div className="location-address">
                  <p>Street, Sigiriya, Central</p>
                  <p>Sri Lanka(78.158.187.65)</p>
                </div>
              </div>
            </div>

            <div className="location-card">
                <div className="location-header">
                  <span className="location-name">Kandy</span>
                  <span className="location-tag secondary-tag">Tertiary</span>
                </div>
                <div className="location-address">
                  <p>capital city in Central Province</p>
                  <p>Sri Lanka(67.158.187.65)</p>
                </div>
              </div>
          </aside>
          {/* Main Content Area */}
          <main className="profile-main">
            <div className="profile-header">
              <div className="profile-info">
                <h1 className="profile-name">Dilshan Sathsara</h1>
                <div className="profile-location">
                  <span className="location-icon">📍</span>
                  <span>Mathugam</span>
                </div>
                
                
                <div className="rating">
                  <span className="rating-number">8,6</span>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bookmark-container">
                <button className="bookmark-btn">
                  <span className="bookmark-icon">🔖</span>
                  <span>Bookmark</span>
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="send-message-btn">
                <span className="message-icon">💬</span>
                <span>Send message</span>
              </button>
              <button className="contacts-btn">
                <span className="contacts-icon">👤</span>
                <span>Contacts</span>
              </button>
              <button className="report-btn">
                Report user
              </button>
            </div>

            <div className="user-profile-tabs">
              <button 
                className={`user-profile-tab ${activeTab === 'tours' ? 'active' : ''}`}
                onClick={() => setActiveTab('tours')}
              >
                <span className="clock-icon">🧭</span>
                <span>Tours</span>
              </button>
              <button 
                className={`user-profile-tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <span className="about-icon">👤</span>
                <span>About</span>
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'about' && (
                <div className="about-content">
                  <div className="info-section">
                    <h3 className="section-label">Contact Information</h3>
                    
                    <div className="info-grid">
                      <div className="info-item">
                        <p className="info-label">Phone:</p>
                        <p className="info-value">+94 769477675</p>
                      </div>
                      <div className="info-item">
                        <p className="info-label">Address:</p>
                        <p className="info-value">No 22</p>
                        <p className="info-value">Mathugama, Sri Lanka</p>
                      </div>
                      <div className="info-item">
                        <p className="info-label">E-mail:</p>
                        <p className="info-value email">sathsaradilshan31@gmail.com</p>
                      </div>
                      <div className="info-item">
                        <p className="info-label">Site:</p>
                        <p className="info-value website">www.sathsaradilshan.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3 className="section-label">Basic Information</h3>
                    
                    <div className="info-grid">
                      <div className="info-item">
                        <p className="info-label">Birthday:</p>
                        <p className="info-value">June 5, 2000</p>
                      </div>
                      <div className="info-item">
                        <p className="info-label">Gender:</p>
                        <p className="info-value">Male</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tours' && (
                <div className="tours-container">
                  <div className="tour-list">
                    {tours.length > 0 ? (
                      tours.map((tour, index) => (
                        <TourComponent
                          key={index}
                          image={tour.image}
                          title={tour.title}
                          destinations={tour.destinations}
                          price={tour.price}
                          preDefTourId={tour.preDefTourId}
                        />
                      ))
                    ) : (
                      <p>Loading tours...</p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;