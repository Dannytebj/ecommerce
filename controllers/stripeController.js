const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.chargeCustomer = async (req, res, next) => {
  const { stripeToken, amount, currency, description, order } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source: stripeToken
    })
  }
  catch(error) {
    next(error);
  }
}