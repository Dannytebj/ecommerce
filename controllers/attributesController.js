const { Attribute, AttributeValue, ProductAttribute, Product } = require('../models');


exports.getAttributes = async (req, res, next) => {
  try {
    const attributes = await Attribute.findAll();
    if (!attributes) {
      return res.status(200).send({ message: 'No attributes' })
    }
    return res.status(200).send(attributes);
  }
  catch (error) {
    next(error);
  }
};

exports.getAttribute = async (req, res, next) => {
  const { attribute_id } = req.params
  try {
      const attribute = await Attribute.findOne({ where: { attribute_id }});
      if (!attribute) {
        return res.status(404).send({ 
          message: `Attribute with id ${attribute_id} not found`
        });
      }
      return res.status(200).send(attribute);
  }
  catch (error) {
    next(error);
  }
};

exports.getAttributeValues = async (req, res, next) => {
  const { attribute_id } = req.params;
  try {
    if (attribute_id) {
      const attributes = await AttributeValue.findAll({ where: { attribute_id }, attributes: { exclude: ['attribute_id']} });
      if (!attributes) {
        return res.status(404).send({ 
          message: `Attributes with id ${attribute_id} not found`
        });
      }
      return res.status(200).send(attributes);

    } else {
      res.status(400).send({ message: 'No attribute_id provided'});
    }
  }
  catch(error) {
    console.log(error);
    next(error)
  }
}
exports.getProductAttributes = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const productAttributes = await ProductAttribute.findAll({ where: { product_id }, 
      include: [{ model: AttributeValue, 
        include: [{ model: Attribute,  attributes: ['name'] }], attributes: ['attribute_value_id', 'value'] }
      ]})
    if (!productAttributes) {
      return res.status(404).send({ 
        message: `Attributes with id ${product_id} not found`
      });
    }
    let responseArr= [];
    productAttributes.forEach((payload) => {
      let obj = {};
      obj.attribute_name = payload.AttributeValues[0].Attribute.name;
      obj.attribute_value_id = payload.attribute_value_id;
      obj.attribute_value = payload.AttributeValues[0].value;

      responseArr.push(obj);
    })
    return res.status(200).send(responseArr);
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}
