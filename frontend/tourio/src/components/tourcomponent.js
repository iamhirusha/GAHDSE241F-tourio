import React from "react";
import './tourcomponent.css'; 
import { useNavigate } from 'react-router-dom';
//import { ReactComponent as BookmarkIcon } from '../assets/icons/icon_bookmark.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/icon_right-arrow.svg';

const TourComponent = ({ image, title, destinations, price, preDefTourId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tour/${preDefTourId}`);
  };  

  return (
    <div className="tour-card" onClick={handleClick}>
      <div className="tour-image-container">
        <img src={image} alt={title} className="tour-image" />
      </div>
      
      <div className="tour-info">
        <p className="tour-title">{title}</p>
        <p className="tour-destinations">{destinations}</p>
        <p className="tour-price">LKR {price}</p>
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  );
};

export default TourComponent;
