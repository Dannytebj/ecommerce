const bcrypt = require('bcrypt');
const { Customer } = require('../models');
const generateToken = require('../utils/generateToken');
const errorBody = require('../utils/errorStructure');

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await Customer.findOne({ where: { email }});
    if (user) {
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Customer.findOne({ where: { email }, attributes: { exclude: ['password']}});
    if (!user) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "The email doesn't exist.", "email")
      });
    }
    if (!user.validPassword(password)) {
      return res.status(401).send({
        error: errorBody(401, "USR_01", "Email or Password is invalid.", "email or password")
      })
    }
    return res.status(200).send({
      customer: { schema: user },
      accessToken: generateToken(user),
      expires_in: "24h"
    })

  } 
  catch(error) {
    next(error);
  }
  
}
