const uniqueId = require('uniqid');
const { ShoppingCart, Product } = require('../models');
const errorBody = require('../utils/errorStructure');
const { getCartItems } = require('../utils/formatResponse');


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
  const { cart_id, product_id, attributes } = req.body;
  const quantity = 1 || req.body.quantity;

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

    const cart = await getCartItems(cartItems);

    res.status(200).send(cart);
  }
  catch (error) {
    next(error);
  }
}

exports.updateItem = async (req, res, next) => {
  const { item_id } = req.params;
  if (item_id.trim()) {
    try {
      const itemModel = await ShoppingCart.findByPk(item_id);
      if (!itemModel) {
        return res.status(404).send({
          error: errorBody(404, "USR_05", "This item doesn't exist.", "item_id")
        });
      }
      // Update current cart item model
      await itemModel.update(req.body);

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
  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "item_id is required", "item_id")
    })
  }
};

exports.emptyCart = async (req, res, next) => {
  const { cart_id } = req.params;
  if (cart_id.trim()) {
    try {
    const cartExist = await ShoppingCart.findOne({ where: { cart_id }});
    if (!cartExist) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This cart doesn't exist.", "cart_id")
      });
    }
    await ShoppingCart.destroy({
      where: { cart_id }
    });
    res.send(200);
  } catch(error) {
    next(error);
  }

  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "cart_id is required", "cart_id")
    })
  }
}

exports.getTotalAmountFromCart = async (req, res, next) => {
  const { cart_id } = req.params;
  if(cart_id.trim()) {
    try {
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id },
        include: [{
          model: Product
        }]
      });
      const cart = await getCartItems(cartItems);

      const total_amount = cart.reduce((acc, item) => acc + Number(item.price), 0);

      res.status(200).send({ total_amount });
    }
    catch(error) {
      next(error);
    }
  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "cart_id is required", "cart_id")
    })
  }
}

exports.deleteProductFromCart = async (req, res, next) => {
  const { item_id } = req.params;
  if (item_id.trim()) {
    try {
    const itemExist = await ShoppingCart.findOne({ where: { item_id }});
    if (!itemExist) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This item doesn't exist.", "item_id")
      });
    }
    await ShoppingCart.destroy({
      where: { item_id }
    });
    res.sendStatus(200);
  } catch(error) {
    next(error);
  }

  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "item_id is required", "item_id")
    })
  }
}

exports.saveForLater = async (req, res, next) => {
  const { item_id } = req.params;
  if (item_id.trim()) {
    try {
    const itemModel = await ShoppingCart.findByPk(item_id);
    if (!itemModel) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This item doesn't exist.", "item_id")
      });
    }
    await itemModel.update({
      buy_now: 0
    });
    res.sendStatus(200);
  } catch(error) {
    next(error);
  }

  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "item_id is required", "item_id")
    })
  }
}

exports.getSavedProducts = async (req, res, next) => {
  const { cart_id } = req.params;
  if(cart_id.trim()) {
    try {
      const cartItems = await ShoppingCart.findAll({
        where: { cart_id, buy_now: 0 },
        include: [{
          model: Product,
          attributes: { include: ['name', 'price'] }
        }]
      });

      const cart = cartItems.map((item) => {
        return {
          item_id: item.item_id,
          name: item.Product.name,
          attributes: item.attributes,
          price: item.Product.price,
        }
      })

      res.status(200).send(cart);
    }
    catch(error) {
      next(error);
    }
  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "cart_id is required", "cart_id")
    })
  }
}


