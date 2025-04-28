// HotelProfileSetup.js
import React, { useState } from 'react';
import './hotelprofilepage.css';

function HotelProfile() {
  const [formData, setFormData] = useState({
    hotelName: '',
    customId: '',
    address: '',
    coverImage: null,
    description: '',
    facilities: ''
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Update form data
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    // In a real application, you would use FormData to handle file uploads
    // const formDataToSend = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataToSend.append(key, value);
    // });
    
    // Then you would send formDataToSend to your backend
  };
  
  return (
    <div className="hotel-profile-container">
      <div className="hotel-profile-card">
        <div className="hotel-profile-header">
          <h1>Hotel Profile Setup</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="hotel-profile-form">
          <div className="form-group">
            <label htmlFor="hotelName">Your Hotel Name</label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customId">Hotel Custom ID</label>
            <input
              type="text"
              id="customId"
              name="customId"
              value={formData.customId}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Hotel Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Hotel Cover Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <div className="upload-controls">
                <label htmlFor="coverImage" className="pick-image-btn">
                  Pick Image
                </label>
                <div className="image-preview">
                  {previewImage ? (
                    <img src={previewImage} alt="Hotel preview" />
                  ) : (
                    <div className="placeholder-image">
                      <i className="image-icon"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="facilities">Facilities</label>
            <input
              type="text"
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="e.g. Pool, Gym, WiFi"
            />
          </div>
          
          <button type="submit" className="continue-btn">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default HotelProfile;