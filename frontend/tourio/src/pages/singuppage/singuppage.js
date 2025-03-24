import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./singuppage.css"; // Import CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "Traveler",
    name: "",
    age: "",
    country: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Role Dropdown */}
        <label>Select who you are</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Traveler">Traveler</option>
          <option value="Guide">Guide</option>
          <option value="Hotel">Hotel</option>
        </select>

        {/* Name */}
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} required />

        {/* Age & Country */}
        <div className="age-country">
          <div>
            <label>Age</label>
            <input type="number" name="age" onChange={handleChange} required />
          </div>
          <div>
            <label>Country</label>
            <input type="text" name="country" onChange={handleChange} required />
          </div>
        </div>

        {/* Email */}
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />

        {/* Password */}
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} required />

        {/* Submit Button */}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Signup;
