import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './addtourrequestpage.css';

const AddTourRequest = () => {
  const [formData, setFormData] = useState({
    tourTitle: '',
    destination1: '',
    destination2: '',
    destination3: '',
    destination4: '',
    destination5: '',
    expectedBudget: '',
    specialNotes: '',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('User not authenticated.');
      return;
    }

    const token = await user.getIdToken();

    const payload = {
      tourTitle: formData.tourTitle,
      destination1: formData.destination1,
      destination2: formData.destination2,
      destination3: formData.destination3,
      destination4: formData.destination4,
      destination5: formData.destination5,
      expectedBudget: formData.expectedBudget,
      specialNotes: formData.specialNotes,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/addtourrequest/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Tour request submitted! ID: ${response.data.tourReqId}`);
    } catch (error) {
      console.error('Error submitting tour request:', error);
      alert('Failed to submit tour request.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title"> Publish Tour Request</h2>
      <form onSubmit={handleSubmit} className="tour-form">
        <input name="tourTitle" placeholder="Tour Title" onChange={handleChange} required />
        <input name="destination1" placeholder="Destination 1" onChange={handleChange} />
        <input name="destination2" placeholder="Destination 2" onChange={handleChange} />
        <input name="destination3" placeholder="Destination 3" onChange={handleChange} />
        <input name="destination4" placeholder="Destination 4" onChange={handleChange} />
        <input name="destination5" placeholder="Destination 5" onChange={handleChange} />
        <input name="expectedBudget" placeholder="Expected Budget (USD)" onChange={handleChange} required />
        <textarea name="specialNotes" placeholder="Special Notes" onChange={handleChange}></textarea>
        <button type="submit">Submit Tour Request</button>
      </form>
    </div>
  );
};

export default AddTourRequest;
