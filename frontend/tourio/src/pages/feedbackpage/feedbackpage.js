import React, { useState } from 'react';
import './feedbackpage.css';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    
    // Handle feedback submission here
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    alert('Thank you for your feedback!');
    
    // Reset form
    setRating(0);
    setFeedback('');
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        className={`star ${star <= (hoverRating || rating) ? 'star-active' : 'star-inactive'}`}
        onClick={() => handleStarClick(star)}
        onMouseEnter={() => handleStarHover(star)}
        onMouseLeave={handleStarLeave}
      >
        <svg
          className="star-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-content">
          <h1 className="feedback-title">
            We value your opinion.
          </h1>
          
          <p className="feedback-subtitle">
            How would you rate your overall experience?
          </p>
          
          <div className="stars-container">
            {renderStars()}
          </div>
          
          <p className="feedback-prompt">
            Kindly take a moment to tell us what you think.
          </p>
          
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Share your thoughts..."
            className="feedback-textarea"
          />
          
          <button
            onClick={handleSubmit}
            className="submit-button"
          >
            Share my feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;