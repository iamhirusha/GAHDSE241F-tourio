const db = require('../services/firebaseService');

exports.handleWebhook = async (req, res) => {
  try {
    const params = req.body.queryResult.parameters;

    const userId = req.user?.uid;
    if (!userId) {
      return res.json({
        fulfillmentText: 'Authorization failed. Please log in again.',
      });
    }

    const newTourRequest = {
      tourTitle: params.tourTitle,
      userId: userId,
      destination1: params.destination1,
      destination2: params.destination2,
      destination3: params.destination3,
      destination4: params.destination4,
      destination5: params.destination5,
      expectedBudget: params.expectedBudget,
      specialNotes: params.specialNotes || '',
      createdAt: new Date(),
    };

    const docRef = await db.collection('TourRequests').add(newTourRequest);
    await docRef.update({ tourReqId: docRef.id });

    res.json({
      fulfillmentText: `Thanks! Your custom tour '${newTourRequest.tourTitle}' was successfully published.`,
    });
  } catch (error) {
    console.error('Error in Dialogflow webhook:', error);
    res.json({
      fulfillmentText: 'Something went wrong while publishing your tour. Please try again.',
    });
  }
};
