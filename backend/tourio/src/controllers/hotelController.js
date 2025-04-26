const db = require('../services/firebaseService');

const getHotels = async (req, res) => {
  try {
    const snapshot = await db.collection('Hotels').get();
    const hotels = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      hotels.push({
        hotelImage: data.hotelCoverImgURL,
        hotelName: data.hotelName,
        hotelDescription: data.hotelDescription,
        hotelAddress: data.hotelAddress,
        hotelId: data.userId,
      });
    });

    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
};

module.exports = { getHotels }; 
