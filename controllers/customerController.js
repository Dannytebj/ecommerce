const bcrypt = require('bcrypt');
const { Customer } = require('../models');
const generateToken = require('../utils/generateToken');
const errorBody = require('../utils/errorStructure');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const customer = await Customer.findOne({ where: { email }});
    if (customer) {
      return res.status(409).send({
        error: errorBody(409, "USR_04", "The email already exists.", "email") 
      });
    }
    const newCustomer = await Customer.create({ 
      name,
      email,
      password 
    });

    return res.status(201).send({
      customer: { schema: newCustomer },
      accessToken: generateToken(newCustomer),
      expires_in: '24h'
    });
  }
  catch (error) {
    next(error);
  }

};

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.user.customer_id);
    if (!customer) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This customer doesn't exist.", "email")
      });
    }
    return res.status(200).send(customer);
  }
  catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const customerModel = await Customer.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    if (!customerModel) {
      res.status(404).send({
        error: errorBody(404, "USR_05", "The email doesn't exist.", "email")
      });
    } else {
      if (!customerModel.validPassword(password)) {
        return res.status(401).send({
          error: errorBody(401, "USR_01", "Email or Password is invalid.", "email or password")
        })
      }
      return res.status(200).send({
        customer: { schema: customerModel },
        accessToken: generateToken(customerModel),
        expires_in: "24h"
      })
    }
  }
  catch (error) {
    next(error);
  }
}

exports.updateCustomer = async (req, res, next) => {
  const { email } = req.body;
  try {
    const customer = await Customer.findOne({ where: { email }});
    if (!customer) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "The email doesn't exist.", "email")
      });
    }
    const updatedCustomer = await customer.update(req.body);
    return res.status(200).send(updatedCustomer);
  }
  catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCustomerAddress = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.user.customer_id);
    if (!customer) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This customer doesn't exist.", "email")
      });
    }
    const updatedAddress = await customer.update(req.body);
    return res.status(200).send(updatedAddress);
  }
  catch (error) {
    next(error);
  }
}

exports.updateCustomerCard = async (req, res, next) => {
  // Use same method above, create a different validator
}
