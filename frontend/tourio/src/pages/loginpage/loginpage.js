import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css"; // Importing the CSS file


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication logic
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);
    
    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="left-section">
          <h2>Welcome back to <span>Tourio Login</span></h2>
          <p>It's great to have you back!</p>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            
            <div className="buttons">
              <button type="submit" className="login-btn">Login</button>
              <button className="signup-btn">Create Account</button>
            </div>
          </form>
          
          <div className="social-login">
            <p>Or login with</p>
            <div className="social-buttons">
              <a href="#" className="facebook">Facebook</a>
              <a href="#" className="google">Google</a>
            </div>
          </div>
        </div>

        <div className="right-section">
          {/* Background Image */}
        </div>
      </div>
    </div>
  );
};

export default Login;
