const Sequelize = require('sequelize');
const { Product } = require('../models');
const errorBody = require('../utils/errorStructure');
 

const Op = Sequelize.Op;

exports.getProducts = async (req, res, next) => {
  const limit = 20 || req.params.limit;
  const offset = 0 || req.params.limit;
  const description_length = 200 || req.params.description_length;
  const page = 1 || req.params.page;
  try {
    const records = await Product.findAndCountAll();
    // const pages = Math.ceil(records.count / limit)

    if (records) {
      const products = await Product.findAll({
        limit,
        offset,
        order: ['product_id', 'name']
      });
      if (!products) {
        return res.status(200).send({ message: 'No products' })
      }
      return res.status(200).send({
        count: records.count,
        rows: products,
      });
    } else {
      return res.status(200).send({ message: 'No products' })
    }
  }
  catch (error) {
    next(error);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const { product_id } = req.params
  try {
      const product = await Product.findOne({ where: { product_id }});
      if (!product) {
        return res.status(404).send({ 
          message: `Product with id ${product_id} not found`
        });
      }
      return res.status(200).send(product);
  }
  catch (error) {
    next(error);
  }
};

exports.getCategoriesIndepartment = async (req, res, next) => {

}

exports.productSearch = async (req, res, next) => {
  const { query_string, all_words, page } = req.query;
  const allWords = 'on' || all_words;
  const currentPage = 1 || page;
  const limit = 20 || req.params.limit;
  const description_length = 200 || req.params.description_length;
  if (query_string !== '' || null) {
    try {
      const records = await Product.findAndCountAll({
        limit,
        where: {
          [Op.or]: [
            {
              name: { [Op.like]: `%${query_string}%` }
            },
            {
              description: { [Op.like]: `%${query_string}%` }
            }
          ]
        }
      });
  
      if (records.count === 0) {
        return res.status(200).send({ message: 'No products match search term' })
      } 
        return res.status(200).send(records);
  
    } catch (error) {
      console.log(error)
      next(error);
    }
  } else {
    res.status(400).send(errorBody(400, "USR_02", "The field example is empty.", "query_string"))
  }
  
}

  // where: {
  //   name: { $like: `%${query_string}%` },
  //   $or: [
  //     {
  //       description: { $like: `%${query_string}%` }
  //     },
  //   ]
  // }