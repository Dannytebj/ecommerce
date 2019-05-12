const express = require('express');
const { register, login, updateCustomer, getCustomer, updateCustomerAddress } = require('../controllers/customerController');
const {
  getAttributes,
  getAttribute,
  getAttributeValues,
  getProductAttributes
} = require('../controllers/attributesController');
const { getCategories, getSingleCategory, getCategoriesOfDepartment } = require('../controllers/categoryController');
const { getDepartments, getSingleDepartment } = require('../controllers/departmentController');

const {
  getProducts,
  getSingleProduct,
  productSearch,
  productsInCategory,
  productDetails,
  productLocation,
  postReview,
  getProductReviews
 } = require('../controllers/productController');
 const {
   generateId,
   addToCart,
   getCart,
   updateItem,
   emptyCart,
   getTotalAmountFromCart,
   deleteProductFromCart,
   saveForLater
  } = require('../controllers/shoppingCartController');
const {
  validateToken,
  validateCustomerReg,
  validateCustomerLog,
  validateUpdateCustomer,
  validatCustomerCard,
  validateCustomerAddy,
  validateReview,
  validateCart,
  validateUpdateCart
} = require('../middlewares/validators');

const router = express.Router();
// Customers
router.post('/customers', validateCustomerReg, register);
router.post('/customers/login', validateCustomerLog, login);
router.put('/customers', validateToken, validateUpdateCustomer, updateCustomer);
router.put('/customers/address', validateToken, validateCustomerAddy, updateCustomerAddress);
router.put('/customers/creditCard', validateToken, validatCustomerCard, updateCustomerAddress);
router.get('/customers', validateToken, getCustomer);

// Attributes
router.get('/attributes', getAttributes);
router.get('/attributes/:attribute_id', getAttribute);
router.get('/attributes/values/:attribute_id', getAttributeValues);
router.get('/attributes/inProduct/:product_id', getProductAttributes);

// Departments
router.get('/departments', getDepartments);
router.get('/departments/:department_id', getSingleDepartment);

// Category
router.get('/categories', getCategories);
router.get('/categories/:category_id', getSingleCategory);
router.get('/categories/inDepartment/:department_id', getCategoriesOfDepartment);

// Product
router.get('/products', getProducts);
router.get('/products/search/', productSearch);
router.get('/products/:product_id', getSingleProduct);
router.get('/products/:product_id/details', productDetails);
router.get('/products/:product_id/locations', productLocation);
router.get('/products/:product_id/reviews', getProductReviews);
router.post('/products/:product_id/reviews', validateReview, validateToken, postReview);
router.get('/products/inCategory/:category_id', productsInCategory);

// Shopping Cart
router.get('/shoppingcart/generateUniqueId', generateId);
router.post('/shoppingcart/add', validateCart, addToCart);
router.get('/shoppingcart/:cart_id', getCart);
router.delete('/shoppingcart/empty/:cart_id', emptyCart);
router.get('/shoppingcart/totalAmount/:cart_id', getTotalAmountFromCart);
router.put('/shoppingcart/update/:item_id', validateUpdateCart, updateItem);
router.delete('/shoppingcart/removeProduct/:item_id', deleteProductFromCart);
router.get('/shoppingcart/saveForLater/:item_id', saveForLater);



module.exports = router;
