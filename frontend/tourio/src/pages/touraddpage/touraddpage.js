import React, { useState } from 'react';
import './touraddpage.css';

const TourCreationPage = () => {
  const [formData, setFormData] = useState({
    tourTitle: '',
    destinations: [{ name: '', mapUrl: '' }],
    coverImage: null,
    guideProfile: '',
    facilities: '',
    price: '',
    optionTitle: '',
    options: [{ value: '' }]
  });

  // Generic change handler for nested form fields
  const handleChange = (field, value, groupIndex = null, subField = null) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      if (groupIndex !== null && subField !== null) {
        // Handle nested array updates
        const updatedGroup = [...newData[field]];
        updatedGroup[groupIndex] = {
          ...updatedGroup[groupIndex],
          [subField]: value
        };
        newData[field] = updatedGroup;
      } else {
        // Handle direct field updates
        newData[field] = value;
      }
      
      return newData;
    });
  };

  // Add item to array fields
  const addItem = (field, maxItems, template) => {
    setFormData(prevData => {
      const currentItems = prevData[field];
      return {
        ...prevData,
        [field]: currentItems.length < maxItems 
          ? [...currentItems, template] 
          : currentItems
      };
    });
  };

  // Remove item from array fields
  const removeItem = (field, index) => {
    setFormData(prevData => {
      const currentItems = prevData[field];
      return {
        ...prevData,
        [field]: currentItems.length > 1 
          ? currentItems.filter((_, i) => i !== index) 
          : currentItems
      };
    });
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('coverImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="tour-creation-wrapper">
      <div className="tour-creation-container">
        <form onSubmit={handleSubmit} className="tour-creation-form">
          <div className="form-content">
            {/* Tour Title */}
            <div className="form-header">
              <h2>Create Your Tour</h2>
              <p>Fill in the details for your amazing tour</p>
            </div>

            {/* Tour Title Input */}
            <div className="input-group">
              <label htmlFor="tourTitle">Tour Title</label>
              <input 
                type="text"
                id="tourTitle"
                value={formData.tourTitle}
                onChange={(e) => handleChange('tourTitle', e.target.value)}
                placeholder="Enter your tour title"
                required
              />
            </div>

            {/* Destinations Section */}
            <div className="section-group">
              <div className="section-header">
                <h3>Destinations</h3>
                <button 
                  type="button" 
                  className="action-btn add-btn"
                  onClick={() => addItem('destinations', 5, { name: '', mapUrl: '' })}
                  disabled={formData.destinations.length >= 5}
                >
                  + Add Destination
                </button>
              </div>

              {formData.destinations.map((destination, index) => (
                <div key={index} className="input-row">
                  <div className="input-column">
                    <label>Destination Name</label>
                    <input 
                      type="text"
                      value={destination.name}
                      onChange={(e) => handleChange('destinations', e.target.value, index, 'name')}
                      placeholder={`Destination ${index + 1} name`}
                    />
                  </div>
                  <div className="input-column">
                    <label>Map URL</label>
                    <input 
                      type="url"
                      value={destination.mapUrl}
                      onChange={(e) => handleChange('destinations', e.target.value, index, 'mapUrl')}
                      placeholder="Enter map URL"
                    />
                  </div>
                  {formData.destinations.length > 1 && (
                    <div className="action-column">
                      <button 
                        type="button" 
                        className="action-btn remove-btn"
                        onClick={() => removeItem('destinations', index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Options Section */}
            <div className="section-group">
              <div className="section-header">
                <h3>Tour Options</h3>
                <button 
                  type="button" 
                  className="action-btn add-btn"
                  onClick={() => addItem('options', 3, { value: '' })}
                  disabled={formData.options.length >= 3}
                >
                  + Add Option
                </button>
              </div>

              <div className="input-group">
                
                <input 
                  type="text"
                  value={formData.optionTitle}
                  onChange={(e) => handleChange('optionTitle', e.target.value)}
                  placeholder="Enter option title"
                />
              </div>

              {formData.options.map((option, index) => (
                <div key={index} className="input-row">
                  <div className="input-column full-width">
                    <label>Option {index + 1}</label>
                    <input 
                      type="text"
                      value={option.value}
                      onChange={(e) => handleChange('options', e.target.value, index, 'value')}
                      placeholder={`Enter option ${index + 1}`}
                    />
                  </div>
                  {formData.options.length > 1 && (
                    <div className="action-column">
                      <button 
                        type="button" 
                        className="action-btn remove-btn"
                        onClick={() => removeItem('options', index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Details */}
            <div className="section-group">
              <h3>Additional Information</h3>
              <div className="input-row">
                <div className="input-column">
                  <label>Guide Profile</label>
                  <input 
                    type="text"
                    value={formData.guideProfile}
                    onChange={(e) => handleChange('guideProfile', e.target.value)}
                    placeholder="Enter guide profile"
                  />
                </div>
                <div className="input-column">
                  <label>Facilities</label>
                  <input 
                    type="text"
                    value={formData.facilities}
                    onChange={(e) => handleChange('facilities', e.target.value)}
                    placeholder="Enter tour facilities"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-column">
                  <label>Price</label>
                  <input 
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="Enter tour price"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="section-group">
              <h3>Tour Cover Image</h3>
              <div className="image-upload-container">
                <input 
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-input"
                />
                <label htmlFor="coverImage" className="image-upload-label">
                  {formData.coverImage ? 'Change Image' : 'Upload Image'}
                </label>
                {formData.coverImage && (
                  <div className="image-preview">
                    <img 
                      src={formData.coverImage} 
                      alt="Tour Cover" 
                      className="preview-image"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Create Tour
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourCreationPage;