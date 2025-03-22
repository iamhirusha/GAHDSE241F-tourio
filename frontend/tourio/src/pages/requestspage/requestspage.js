import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div className="requestspage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default RequestsPage;
