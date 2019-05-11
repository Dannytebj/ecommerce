const Sequelize = require('sequelize');
const { Product, ProductCategory, Category, Department, Review } = require('../models');
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
      next(error);
    }
  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "The field example is empty.", "query_string")
    })
  }
  
}

exports.productsInCategory = async (req, res, next) => {
  const { category_id } = req.params;

  try {
    const products = await ProductCategory.findAndCountAll({ where: { category_id }, include: [{ model: Product }]})
    if (!products) {
      return res.status(200).send({ message: 'There are no products in this category' });
    }
    const rows = [];
    products.rows.forEach((row) => {
      rows.push(row.Products[0]);
    })
    return res.status(200).send({
      count: products.count,
      rows
    });
  }
  catch(error) {
    console.log(error);
    next(error);
  }
}

exports.productDetails = async (req, res, next) => {
  const { product_id } = req.params;
  if (product_id !== '') {
    try {
      const product = await Product.findOne({ where: { product_id }, attributes: { exclude: ['thumbnail', 'display'] } });
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
  } else {
    res.status(400).send({
      error: errorBody(400, "USR_02", "The field example is empty.", "product_id")
    })
  }
}

exports.productLocation = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const productLocation = await ProductCategory.findOne({
      where: { product_id },
      include: [{
        model: Category,
        include: [{ model: Department, attributes: ['name'] }],
        attributes: { exclude: ['description'] }
      }]
    });
    if (!productLocation) {
      res.status(200).send({ message: 'No location for this product_id' })
    }
    const responseObj = {
      category_id: productLocation.category_id,
      category_name: productLocation.Category.name,
      department_id: productLocation.Category.department_id,
      department_name: productLocation.Category.Department.name,
    }
    res.status(200).send(responseObj);
  }
  catch (error) {
    next(error);
  }
}

exports.postReview = async (req, res, next) => {
  const { review, rating } = req.body;
  const { product_id } = req.params;

  try {
    const productExists = await Product.findOne({ where: { product_id } });
    if (!productExists) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This product doesn't exist.", "product_id")
      });
    }
    await Review.create({
      product_id,
      review,
      rating,
      customer_id: 1,
      created_on: Date.now()
    });
    return res.status(201).send({ message: 'review successful' })
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

// `review_id` int(11) NOT NULL AUTO_INCREMENT,
// `customer_id` int(11) NOT NULL,
// `product_id` int(11) NOT NULL,
// `review` text NOT NULL,
// `rating` smallint(6) NOT NULL,
// `created_on` datetime NOT NULL,
// PRIMARY KEY (`review_id`),
// KEY `idx_review_customer_id` (`customer_id`),
// KEY `idx_review_product_id` (`product_id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1;