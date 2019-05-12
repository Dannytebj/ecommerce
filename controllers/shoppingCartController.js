const { ShoppingCart, Product } = require('../models');
const uniqueId = require('uniqid');

exports.generateId = async (req, res, next) => {
  try {
    const cart_id = await uniqueId();

    res.status(200).send({ cart_id });
  }
  catch (error) {
    next(error)
  }
}

exports.addToCart = async (req, res, next) => {
  const { cart_id, product_id, attributes, quantity } = req.body;

  try {
    // find product first
    const product = await Product.findOne({ where: { product_id } });
    if (!product) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This product doesn't exist.", "product_id")
      });
    }

    await ShoppingCart.create({
      cart_id,
      product_id,
      attributes,
      quantity,
      added_on: Date.now()
    });
    const cartItems = await ShoppingCart.findAll({
      include: [{
        model: Product
      }]
    });
    const cart = await getCartItems(cartItems);
    res.status(200).send(cart);
  }
  catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  const { cart_id } = req.params;
  try {
    const cartItems = await ShoppingCart.findAll({
      where: { cart_id },
      include: [{
        model: Product
      }]
    });

    const cart  = await getCartItems(cartItems);

    res.status(200).send(cart);
  }
  catch (error) {
    next(error);
  }
}

async function getCartItems(cartItems) {
  const cart = [];
  cartItems.forEach((item) => {
    const cartObj = {
      item_id: item.item_id,
      name: item.Product.name,
      attributes: item.attributes,
      product_id: item.product_id,
      price: item.Product.price,
      quantity: item.quantity,
      image: item.Product.image,
      subTotal: item.Product.price
    }
    cart.push(cartObj);
  })

  return cart;
}
