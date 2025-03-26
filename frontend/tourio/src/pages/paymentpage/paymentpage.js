import React, { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import "./paymentpage.css";

const Payment = () => {
  const [cards, setCards] = useState([
    { id: 1, type: "mastercard", number: "**** **** **** 3193" },
    { id: 2, type: "visa", number: "**** **** **** 4296" }
  ]);

  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleRemove = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleAddCard = () => {
    if (cardNumber.length < 16) {
      alert("Enter a valid card number");
      return;
    }

    const cardType = cardNumber.startsWith("4") ? "visa" : "mastercard";
    const lastFour = cardNumber.slice(-4);
    const newCard = {
      id: cards.length + 1,
      type: cardType,
      number: `**** **** **** ${lastFour}`
    };

    setCards([...cards, newCard]);
    setCardholder("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>💳 Payment Settings</h2>
        <p>Manage your saved cards and add new ones.</p>

        {/* Saved Cards Section */}
        <div className="saved-cards">
          <h3>Saved Cards:</h3>
          {cards.map((card) => (
            <div key={card.id} className="card">
              {card.type === "visa" ? <FaCcVisa className="card-icon visa" /> : <FaCcMastercard className="card-icon mastercard" />}
              <span>{card.number}</span>
              <button className="remove-btn" onClick={() => handleRemove(card.id)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Add New Card Section */}
        <div className="add-card">
          <h3>Add New Card:</h3>
          <div className="input-group">
            <label>Cardholder's Name</label>
            <input type="text" placeholder="Enter name" value={cardholder} onChange={(e) => setCardholder(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 1234 5678" maxLength="19" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>

          <div className="card-details">
            <div className="input-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" maxLength="5" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="text" placeholder="123" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          </div>

          <button className="add-btn" onClick={handleAddCard}>➕ ADD CARD</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
