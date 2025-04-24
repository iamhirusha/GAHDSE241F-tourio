const db = require('../services/firebaseService');

const getPredefinedTours = async (req, res) => {
  try {
    const snapshot = await db.collection('PredefinedTours').get();
    const tours = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      tours.push({
        image: data.preTourImgUrl,
        title: data.tourTitle,
        destinations: data.destination5,
        price: data.tourPrice,
        preDefTourId: data.preDefTourId,
        hoteluserId: data.hoteluserId,
      });
    });

    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ message: 'Failed to fetch tours' });
  }
};

module.exports = { getPredefinedTours };
