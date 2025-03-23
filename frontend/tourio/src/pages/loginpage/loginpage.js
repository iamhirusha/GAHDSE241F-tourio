import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p className="link">Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
