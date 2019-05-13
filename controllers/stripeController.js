const dotenv = require('dotenv');
dotenv.config();
const { Order } = require('../models');
const errorBody = require('../utils/errorStructure');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.chargeCustomer = async (req, res, next) => {
  const { stripeToken, amount, currency, description, order_id } = req.body;
  try {
    const order = await Order.findByPk(order_id);
    if (!order) {
      res.status(400).send({
        error: errorBody(400, "USR_02", "This order does not exists.", "order_id")
      });
    } else {
      const charge = await stripe.charges.create({
        amount,
        currency,
        description,
        source: stripeToken
      });
      if (!charge) {
        return res.status(400).send({
          error: errorBody(400, "USR_02", "Sorry This transaction failed", "stripeToken")
        });
      }
      await order.update({ total_amount: amount, status: 1 });
      return res.status(200).send(charge);
    }
  }
  catch (error) {
    next(error);
  }
}

exports.stripeHook = async (req, res) => {
  // const evtJson =JSON.parse(req.body);

  res.status(200).send(req.body);
}
