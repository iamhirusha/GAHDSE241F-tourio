import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import './requestpage.css';

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([
    {
      id: 1,
      destination: "Mediterranean Cruise",
      travelDates: "July 15-25, 2024",
      travelers: 2,
      status: "pending",
      proposals: 3
    },
    {
      id: 2,
      destination: "European City Tour",
      travelDates: "September 5-15, 2024",
      travelers: 4,
      status: "completed",
      proposals: 5
    },
    {
      id: 3,
      destination: "Tropical Island Getaway",
      travelDates: "August 10-20, 2024",
      travelers: 2,
      status: "in-progress",
      proposals: 2
    }
  ]);

  const handleCreateNewRequest = () => {
    // TODO: Implement new request creation modal or navigation
    console.log("Create new request clicked");
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <span className="status-icon">⏳</span>;
      case 'in-progress': return <span className="status-icon">⌛</span>;
      case 'completed': return <span className="status-icon">✅</span>;
      default: return null;
    }
  };

  return (
    <div className="requestspage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="page-content">
        <div className="requests-header">
          <div className="requests-title">
            <h2>My Travel Requests</h2>
            <p>View and manage your travel package requests</p>
          </div>
          <button 
            className="create-request-btn" 
            onClick={handleCreateNewRequest}
          >
            <span className="plus-icon">+</span>
            Create New Request
          </button>
        </div>

        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-details">
                <h3>{request.destination}</h3>
                <div className="request-info">
                  <span>{request.travelDates}</span>
                  <span>•</span>
                  <span>{request.travelers} Travelers</span>
                </div>
                <div className={`request-status ${getStatusClass(request.status)}`}>
                  {getStatusIcon(request.status)}
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </div>
              <div className="request-proposals">
                <div className="proposals-badge">
                  {request.proposals} Proposals
                </div>
                <button className="view-proposals-btn">
                  View Proposals
                </button>
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RequestsPage;