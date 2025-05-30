import React from "react";
import "./contactsection.css";
import contactImage from "../../assets/images/img_rome_1.jpg";

const ContactSection = () => {
  return (
    <div className="contact-container">
      <div className="contact-left"
        style={{
            backgroundImage: `url(${contactImage})`,
        }}
        >
        <div className="contact-overlay">
            <h2 className="contact-title">Need help from Tourio?</h2>
            <p className="contact-email">Email us: tourioteam@gmail.com</p>
        </div>
        </div>
      <div className="contact-right">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder="Enter your message" />
          </div>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
