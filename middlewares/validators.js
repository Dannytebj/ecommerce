const jwt = require('jsonwebtoken');
const Joi = require('joi');
const errorBody = require('../utils/errorStructure');

exports.validateToken = (req, res, next) => {
  const secret = process.env.SECRET;
  const token = req.body.accessToken
    || req.query.token
    || req.headers['authorization'];
  if (!token) {
    return res.status(401).send({
      error: errorBody(401, "AUT_01", "Authorization code is empty.", "token")
    });
  }
  const accessToken = token.split('Bearer ')[1];
  jwt.verify(accessToken, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        error: errorBody(401, "AUT_02", "Access Unauthorized.", "token")
      });
    }
    req.user = decoded.token.user;
    next();
  });
};

exports.validateCustomerReg = (req, res, next) => {
  let schema = Joi.object().keys({
    name: Joi.string().trim().required().error(() => 'Name is required'),
    email: Joi.string().required().regex(/\S+@\S+\.\S+/).trim().error(() => 'Invalid email address'),
    password: Joi.string().trim().required().error(() => 'Password is required')
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ 
        error: errorBody(400, "USR_02", message, "token")
       });
    } else {
      next();
    }
  });
};

exports.validateCustomerLog = (req, res, next) => {
  let schema = Joi.object().keys({
    email: Joi.string().required().regex(/\S+@\S+\.\S+/).trim().error(() => 'Invalid email address'),
    password: Joi.string().trim().required().error(() => 'Password is required')
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ 
        error: errorBody(400, "USR_02", message, "token")
       });
    } else {
      next();
    }
  });
};

exports.validateReview = (req, res, next) => {
  let schema = Joi.object().keys({
    review: Joi.string().required().trim().error(() => 'review is required'),
    rating: Joi.number().required().error(() => 'rating is required')
  });
   Joi.validate(req.body, schema, (error, data) => {
      if (error) {
        const message = error.details[0].message;
        res.status(400).send({ 
          error: errorBody(400, "USR_02", message, "token")
         });
      } else {
        next();
      }
    });
};

exports.validateUpdateCustomer = (req, res, next) => {
  let schema = Joi.object().keys({
    name: Joi.string().trim().required().error(() => 'Name is required'),
    email: Joi.string().required().regex(/\S+@\S+\.\S+/).trim().error(() => 'Invalid email address'),
    password: Joi.string().trim().error(() => 'Password must be a string'),
    day_phone: Joi.string().trim().error(() => 'day_phone must be a string'),
    eve_phone: Joi.string().trim().error(() => 'eve_phone must be a string'),
    mob_phone: Joi.string().trim().error(() => 'mob_phone must be a string')
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ 
        error: errorBody(400, "USR_02", message, "token")
       });
    } else {
      next();
    }
  });
};

exports.validateCustomerAddy = (req, res, next) => {
  let schema = Joi.object().keys({
    address_1: Joi.string().trim().required().error(() => 'address_1 must be a string & not empty'),
    address_2: Joi.string().trim().error(() => 'address_2 must be a string'),
    city: Joi.string().trim().required().error(() => ' city must be a valid string & not empty'),
    region: Joi.string().trim().required().error(() => 'region must be a string & not empty'),
    postal_code: Joi.string().trim().required().error(() => 'postal_code must be a string & not empty'),
    country: Joi.string().trim().required().error(() => 'country must be a string & not empty'),
    shipping_region_id: Joi.number().required().error(() => 'shipping_region_id must be a positive number'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({
        error: errorBody(400, "USR_02", message, "customer_address")
      });
    } else {
      next();
    }
  });
};

exports.validatCustomerCard = (req, res, next) => {
  let schema = Joi.object().keys({
    credit_card: Joi.string().trim().required().error(() => 'credit_card must be a string & not empty'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({
        error: errorBody(400, "USR_02", message, "customer_card")
      });
    } else {
      next();
    }
  });
}

exports.validateCart = (req, res, next) => {
  let schema = Joi.object().keys({
    cart_id:Joi.string().trim().required().error(() => 'cart_id must be a string'),
    product_id: Joi.number().required().error(() => 'product_id is required'),
    attributes: Joi.string().trim().required().error(() => 'attributes is required & must be a string'),
    quantity: Joi.number().error(() => 'quantity must be an integer'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({
        error: errorBody(400, "USR_02", message, "cart")
      });
    } else {
      next();
    }
  });
};

exports.validateUpdateCart = (req, res, next) => {
  let schema = Joi.object().keys({
    quantity: Joi.number().required().error(() => 'quantity is required & must be an integer'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({
        error: errorBody(400, "USR_02", message, "update cart")
      });
    } else {
      next();
    }
  });
};

exports.validateOrder = (req, res, next) => {
  let schema = Joi.object().keys({
    cart_id:Joi.string().trim().required().error(() => 'cart_id is required & must be a string'),
    tax_id: Joi.number().required().error(() => 'tax_id is required & must be an integer'),
    shipping_id: Joi.number().required().error(() => 'shipping_id is required & must be an integer'),
  });

  Joi.validate(req.body, schema, (error, data) => {
    if (error) {
      const message = error.details[0].message;
      res.status(400).send({
        error: errorBody(400, "USR_02", message, "order")
      });
    } else {
      next();
    }
  });
};
