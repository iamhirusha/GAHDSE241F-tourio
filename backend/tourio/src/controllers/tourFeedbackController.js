const db = require('../services/firebaseService');

exports.submitTourFeedback = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { preDefTourId, starCount, tourType, feedbackText } = req.body;

    if (!preDefTourId || !starCount || !tourType || !feedbackText) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const feedbackRef = db.collection('TourFeedbacks').doc();
    const tourFeedbackId = feedbackRef.id;

    const feedbackData = {
      tourFeedbackId,
      tourFeedbackStarCount: starCount,
      tourFeedbackType: tourType,
      tourFeedbackText: feedbackText,
      preDefTourId,
      userId,
      createdAt: new Date()
    };

    await feedbackRef.set(feedbackData);

    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
