const db = require('../services/firebaseService');

const getFeedbacksByTourId = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('TourFeedbacks').where('preDefTourId', '==', id).get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const feedbacks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        tourFeedbackId: data.tourFeedbackId,
        tourFeedbackStarCount: data.tourFeedbackStarCount,
        tourFeedbackText: data.tourFeedbackText,
        tourFeedbackType: data.tourFeedbackType,
        userId: data.userId,
      };
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching tour feedbacks:', error);
    res.status(500).json({ message: 'Failed to fetch tour feedbacks' });
  }
};

module.exports = { getFeedbacksByTourId };
