const express = require('express');
const { register, login, updateCustomer, getCustomer, updateCustomerAddress } = require('../controllers/customerController');
const {
  validateToken,
  validateCustomerReg,
  validateCustomerLog,
  validateUpdateCustomer,
  validatCustomerCard,
  validateCustomerAddy
} = require('../middlewares/validators');
const router = express.Router();

router.post('/customers', validateCustomerReg, register);
router.post('/customers/login', validateCustomerLog, login);
router.put('/customers', validateToken, validateUpdateCustomer, updateCustomer);
router.put('/customers/address', validateToken, validateCustomerAddy, updateCustomerAddress);
router.put('/customers/creditCard', validateToken, validatCustomerCard, updateCustomerAddress);
router.get('/customers', validateToken, getCustomer);

module.exports = router;
