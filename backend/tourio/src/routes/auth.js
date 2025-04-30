const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    res.status(200).json({ message: 'Login successful', uid, email });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});

module.exports = router;
