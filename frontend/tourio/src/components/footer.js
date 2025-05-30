import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaStripe } from "react-icons/fa";
import logo from "../assets/images/logoimage.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
        <img src={logo} alt="Tourio Logo" className="footer-logo" />
        <h2 className="footer-title">Tourio</h2>
        <p>Explore. Plan. Experience.</p>
        <div className="payment-options">
            <h4>Payment Options</h4>
            <div className="payment-icons">
                <a className="payment-icon" href="https://stripe.com/" target="_blank" rel="noopener noreferrer"><FaStripe /></a>
            </div>
        </div>
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><Link to="/touraddpage">Create Tour</Link></li>
            <li><Link to="/profilepage">Profile</Link></li>
            <li><Link to="/addtourrequest">Add Request</Link></li>
            <li><Link to="/notificationpage">Notifications</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <p>Email: tourioteam@gmail.com</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tourio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
