/**
 * Helper method to format response 
 *
 * @param {array} cartItems - array of cart items
 * @returns {array} - formatted array of objects
 */
exports.getCartItems = async (cartItems) => {
  const cart = cartItems.map((item) => {
    return {
      item_id: item.item_id,
      name: item.Product.name,
      attributes: item.attributes,
      product_id: item.product_id,
      price: item.Product.price,
      quantity: item.quantity,
      image: item.Product.image,
      subTotal: item.Product.price
    }
  })
  return cart;
}
