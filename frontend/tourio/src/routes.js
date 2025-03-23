import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import HotelsPage from "./pages/hotelspage/hotelspage";
import RequestsPage from "./pages/requestspage/requestspage";
import Login from "./pages/loginpage/loginpage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/loginpage" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
