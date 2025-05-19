import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/homepage/homepage";
import HotelDashboard from "./pages/hoteldashboard/HotelDashboard";
import HotelProfile from "./pages/hotelprofilepage/hotelprofilepage";
import HotelsPage from "./pages/hotelspage/hotelspage";
import Login from "./pages/loginpage/loginpage";
import Payment from "./pages/paymentpage/paymentpage";

import NotificationPage from "./pages/notificationpage/NotificationPage";
import RequestsPage from "./pages/requestspage/requestspage";
import SignupPage from "./pages/singuppage/singuppage";
import TourCreationPage from "./pages/touraddpage/touraddpage";
import TourPage from "./pages/tourpage/tourpage";

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
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="/hotelprofilepage" element={<HotelProfile/>} />
        <Route path="/hoteldashboard" element={<HotelDashboard />} />
        <Route path="/notificationpage" element={<NotificationPage />} />
        <Route path="/notificationPage" element={<NotificationPage />} />

        <Route path="/aa" element={<App/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
