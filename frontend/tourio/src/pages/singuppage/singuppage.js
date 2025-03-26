import React, { useState } from 'react';
import './singuppage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth logic
    console.log('Google Signup initiated');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-content">
          <div className="signup-form">
            <div className="signup-header">
              <h2>Create Account</h2>
              <p>Join our platform and start your journey</p>
            </div>

            <div className="social-signup">
              <button 
                className="google-signup-btn" 
                onClick={handleGoogleSignup}
              >
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google logo" 
                />
                Continue with Google
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select 
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Your Role</option>
                  <option value="traveler">Traveler</option>
                  <option value="guide">Guide</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  minLength="8"
                  required 
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="signup-btn">
                  Create Account
                </button>
              </div>

              <div className="form-footer">
                <p>Already have an account? <a href="/login">Log In</a></p>
              </div>
            </form>
          </div>

          <div className="signup-illustration">
            <div className="illustration-content">
              <h3>Welcome to Our Platform</h3>
              <p>Discover a world of opportunities and connections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;