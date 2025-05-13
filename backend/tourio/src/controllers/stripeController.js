const stripeService = require('../services/stripeService');

exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripeService.createSession(req.body.tour);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Error in CheckoutSession:', err);
    res.status(500).json({ error: 'Checkout session failed' });
  }
};
