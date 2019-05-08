const express = require('express');
const { register, login } = require('../controllers/customerController');

const router = express.Router();

router.post('/customers', register);
router.post('/customers/login', login);

module.exports = router;