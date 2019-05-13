const { Order, Customer, ShoppingCart, Product } = require('../models');
const errorBody = require('../utils/errorStructure');


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
      cart_id,
      tax_id,
      shipping_id,
      customer_id,
      created_on: Date.now()
    });
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
    const cartItems = await ShoppingCart.findAll({
      where: { cart_id: order.cart_id },
      include: [{
        model: Product
      }]
    });
    const orderInfo = cartItems.map((item) => {
      return {
        order_id,
        product_id: item.product_id,
        attributes: item.attributes,
        product_name: item.Product.name,
        quantity: item.quantity,
        unit_cost: item.Product.price,
        sub_total: item.quantity * Number(item.Product.price)
      }
    })
    res.status(200).send(orderInfo);
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
    const order = await Order.findOne({ where: {order_id}});
    if (!order) {
      return res.status(400).send({
        error: errorBody(400, "USR_02", "This order does not exists.", "order_id") 
      });
    }
    const cartItems = await ShoppingCart.findAll({
      where: { cart_id: order.cart_id },
      include: [{
        model: Product
      }]
    });
    const shortInfo = cartItems.map((item) => {
      return {
        order_id,
        total_amount: item.quantity * Number(item.Product.price),
        created_on: order.created_on,
        shipped_on: order.shipped_on,
        status: order.status,
        name: item.Product.name,
      }
    })
    res.status(200).send(shortInfo);
  }
  catch( error) {
    next(error);
  }
}