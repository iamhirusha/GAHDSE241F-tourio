const { predict } = require('../services/recommendationService');

exports.getRecommendation = (req, res) => {
  const { price, days } = req.body;
  if (!price || !days) {
    return res.status(400).json({ message: 'price and days are required' });
  }
  const label = predict(Number(price), Number(days));
  res.json({ recommendedType: label });
};
