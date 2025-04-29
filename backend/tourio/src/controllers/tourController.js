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


const getPredefinedTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('PredefinedTours').where('preDefTourId', '==', id).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    const destinations = [
      { name: data.destination1, coords: data.des1MapUrl },
      { name: data.destination2, coords: data.des2MapUrl },
      { name: data.destination3, coords: data.des3MapUrl },
      { name: data.destination4, coords: data.des4MapUrl },
      { name: data.destination5, coords: data.des5MapUrl },
    ].map(dest => {
      const [lat, lng] = dest.coords.split(',').map(Number); // convert "7.95, 80.75" to [7.95, 80.75]
      return {
        name: dest.name,
        lat,
        lng
      };
    });

    res.status(200).json({
      image: data.preTourImgUrl,
      title: data.tourTitle,
      destinations,
      facilities: data.facilities,
      price: data.tourPrice,
      preDefTourId: data.preDefTourId,
      hoteluserId: data.hoteluserId,
    });
  } catch (error) {
    console.error('Error fetching tour by ID:', error);
    res.status(500).json({ message: 'Failed to fetch tour' });
  }
};


module.exports = { getPredefinedTours, getPredefinedTourById };
