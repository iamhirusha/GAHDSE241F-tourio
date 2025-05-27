import { useState } from "react";
import Header from "../../components/header";
import "./notificationpage.css";

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState("notifications");

  const proposals = [
    { id: 1, text: "You received a proposal for your Europe tour", time: "2h ago" },
    { id: 2, text: "New proposal: Tropical Island Adventure", time: "1d ago" }
  ];

  const notifications = [
    { id: 1, text: "Your tour booking was confirmed!", time: "30m ago" },
    { id: 2, text: "Payment successful for Mediterranean Cruise", time: "3h ago" }
  ];

  const messages = [
    { id: 1, sender: "Hotel Paradise", text: "Welcome! Let us know your check-in time.", time: "1h ago" },
    { id: 2, sender: "Travel Agent", text: "Can we schedule a call about your tour?", time: "Yesterday" }
  ];

  return (
    <div className="notificationpage">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="page-content">
        <div className="notification-header">
          <h2>Notifications</h2>
          <p>See your latest proposals, alerts, and messages</p>
        </div>

        <div className="notification-section">
          <h3>Proposals</h3>
          {proposals.map((item) => (
            <div key={item.id} className="notification-card">
              <span className="notification-icon">📩</span>
              <div>
                <p>{item.text}</p>
                <span className="notification-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="notification-section">
          <h3>System Notifications</h3>
          {notifications.map((item) => (
            <div key={item.id} className="notification-card">
              <span className="notification-icon">🔔</span>
              <div>
                <p>{item.text}</p>
                <span className="notification-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="notification-section">
          <h3>Messages</h3>
          {messages.map((item) => (
            <div key={item.id} className="notification-card">
              <span className="notification-icon">💬</span>
              <div>
                <p><strong>{item.sender}:</strong> {item.text}</p>
                <span className="notification-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
