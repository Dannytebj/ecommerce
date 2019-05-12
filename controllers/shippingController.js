const { Shipping, ShippingRegion } = require('../models');
const errorBody = require('../utils/errorStructure');

exports.getShippingRegions = async (req, res, next) => {
  try {
    const regions = await ShippingRegion.findAll();
    if (!regions) {
      return res.status(200).send({ message: 'No regions' })
    }
    res.status(200).send(regions);
  }
  catch (error) {
    next(error);
  }
};

exports.shippingRegion = async (req, res, next) => {
  const { shipping_region_id } = req.params;

  try {
    const region = await Shipping.findOne({ where: { shipping_region_id }});
    if (!region) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This shipping region doesn't exist.", "shipping_region_id")
      });
    }
    return res.status(200).send(region);
  }
  catch (error) {
    next(error);
  }
}


