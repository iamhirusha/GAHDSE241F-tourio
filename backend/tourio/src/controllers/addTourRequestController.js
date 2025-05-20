const db = require('../services/firebaseService');

exports.addTourRequest = async (req, res) => {
  try {
    const {
      tourTitle,
      destination1,
      destination2,
      destination3,
      destination4,
      destination5,
      expectedBudget,
      specialNotes,
    } = req.body;

    const userId = req.user.uid; // Get UID from token

    const newTourRequest = {
      tourTitle,
      userId,
      destinations: [destination1, destination2, destination3, destination4, destination5].filter(Boolean),
      expectedBudget,
      specialNotes,
      createdAt: new Date(),
    };

    const docRef = await db.collection('TourRequests').add(newTourRequest);
    await docRef.update({ tourReqId: docRef.id });

    res.status(200).json({ message: 'Tour request added successfully', tourReqId: docRef.id });
  } catch (error) {
    console.error('Error adding tour request:', error);
    res.status(500).json({ message: 'Failed to add tour request', error: error.message });
  }
};
