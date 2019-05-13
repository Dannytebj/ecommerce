const { Order, Customer, ShoppingCart, Product, OrderDetail } = require('../models');
const errorBody = require('../utils/errorStructure');
const { getOrderDetails } = require('../utils/formatResponse');


exports.createOrder = async (req, res, next) => {
  const { cart_id, tax_id, shipping_id } = req.body;
  const { customer_id } = req.user;
  try {
    const customer = await Customer.findOne({ where: { customer_id }});
    if (!customer) {
      return res.status(400).send({
        error: errorBody(400, "USR_02", "The user does not exists.", "customer_id") 
      });
    }
    const newOrder = await Order.create({
      tax_id,
      shipping_id,
      customer_id,
      created_on: Date.now()
    });
    const cartItems = await ShoppingCart.findAll({
      where: { cart_id },
      include: [{
        model: Product
      }]
    });
    const orderDetails = await getOrderDetails(cartItems, newOrder.order_id);
    await OrderDetail.bulkCreate(orderDetails);

    res.status(201).send({ orderId: newOrder.order_id })
  }
  catch (error) {
    next(error);
  }
}

exports.getOrderInfo = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const order = await Order.findOne({ where: {order_id}});
    if (!order) {
      return res.status(400).send({
        error: errorBody(400, "USR_02", "This order does not exists.", "order_id") 
      });
    } 
    const details = await OrderDetail.findAll({ where: { order_id }, raw: true });
  
    details.map((detail) => {
        detail.subtotal= detail.quantity * Number(detail.unit_cost)
        return detail;
      });
      return res.status(200).send(details);
  }
  catch( error) {
    next(error);
  }

}

exports.customerOrders = async (req, res, next) => {
  const { customer_id } = req.user;
  try {
    const customerOrders = await Order.findAll({ where: { customer_id }});

    res.status(200).send(customerOrders);
  }
  catch (error) {
    next(error);
  }
}

exports.getShortOrderDetails = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const order = await Order.findOne({
      where: { order_id },
        include: [{
          model: Customer,
          attributes: ['name']
        }],
      attributes: { 
        exclude: ['comments', 'auth_code', 'reference', 'shipping_id', 'tax_id'] 
      }
    });
    if (!order) {
      return res.status(400).send({
        error: errorBody(400, "USR_02", "This order does not exists.", "order_id")
      });
    }
    const {total_amount, created_on, shipped_on, status} = order;
    const shortDetails = {
      order_id,
      total_amount,
      created_on,
      shipped_on,
      status,
      name: order.Customer.name
    }

    res.status(200).send(shortDetails);
  }
  catch (error) {
    next(error);
  }
}