import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelsPage from "./pages/HotelsPage";
import RequestsPage from "./pages/RequestsPage";
import HomePage from "./pages/homepage/homepage";
import ToursPage from "./pages/tourspage/tourspage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
