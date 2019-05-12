const { Tax } = require('../models');
const errorBody = require('../utils/errorStructure');

exports.getTaxes = async (req, res, next) => {
  try {
    const taxes = await Tax.findAll();
    if (!taxes) {
      return res.status(200).send({ message: 'No taxes' })
    }
    res.status(200).send(taxes);
  }
  catch (error) {
    next(error);
  }
};

exports.getTaxById = async (req, res, next) => {
  const { tax_id } = req.params;
  try {
    const tax = await Tax.findOne({ where: { tax_id }});
    if (!tax) {
      return res.status(400).send({
        error: errorBody(400, "USR_02", "This tax_id doesn't exist.", "tax_id")
      });
    }
    res.status(200).send(tax);
  }
  catch(error) {
    next(error);
  }
}

