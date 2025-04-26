import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage";
import HotelsPage from "./pages/hotelspage/hotelspage";
import RequestsPage from "./pages/requestspage/requestspage";
import Login from "./pages/loginpage/loginpage";
import Signup from "./pages/singuppage/singuppage";
import SignupPage from "./pages/singuppage/singuppage";
import Payment from "./pages/paymentpage/paymentpage";
import TourForm from "./pages/touraddpage/touraddpage";
import TourPage from "./pages/touraddpage/touraddpage";
import TourCreationPage from "./pages/touraddpage/touraddpage";
import TourAddPage from "./pages/touraddpage/touraddpage";
import App from "./App";
import HotelProfile from "./pages/hotelprofilepage/hotelprofilepage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/loginpage" element={<Login/>} />
        <Route path="/singuppage" element={<SignupPage/>} />
        <Route path="/paymentpage" element={<Payment/>} />
        <Route path="/touraddpage" element={<TourCreationPage/>} />
        <Route path="/hotelprofilepage" element={<HotelProfile/>} />

        <Route path="/aa" element={<App/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
