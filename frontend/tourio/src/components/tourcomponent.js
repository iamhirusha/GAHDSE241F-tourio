import React from "react";
import './tourcomponent.css'; 
//import { ReactComponent as BookmarkIcon } from '../assets/icons/icon_bookmark.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/icon_right-arrow.svg';

const TourComponent = ({ image, title, destinations, price }) => {
  return (
    <div className="tour-card">
      <div className="tour-image-container">
        <img src={image} alt={title} className="tour-image" />
      </div>
      
      <div className="tour-info">
        <h3 className="tour-title">{title}</h3>
        <p className="tour-destinations">{destinations}</p>
        <p className="tour-price">LKR {price}</p>
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  );
};

export default TourComponent;
