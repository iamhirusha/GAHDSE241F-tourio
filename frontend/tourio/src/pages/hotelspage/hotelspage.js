import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const HotelsPage = () => {
  const [activeTab, setActiveTab] = useState("hotels");

  return (
    <div className="hotelspage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default HotelsPage;
