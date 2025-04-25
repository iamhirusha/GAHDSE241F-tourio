import React from "react";
import './hotelcomponent.css'; 
import { ReactComponent as BookmarkIcon } from '../assets/icons/icon_bookmark.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/icon_right-arrow.svg';

const HotelComponent = ({ image, name, description, price }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-image-container">
        <img src={image} alt={name} className="hotel-image" />
      </div>
      
      <div className="hotel-info">
        <h3 className="hotel-name">{name}</h3>
        <p className="hotel-Description">{description}</p>
        <p className="hotel-price">{price}</p>
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  );
};

export default HotelComponent;
