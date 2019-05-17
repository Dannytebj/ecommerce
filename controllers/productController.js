const Sequelize = require('sequelize');
const { Product, ProductCategory, Category, Department, Review, Customer } = require('../models');
const errorBody = require('../utils/errorStructure');
 

const Op = Sequelize.Op;

exports.getProducts = async (req, res, next) => {
  const limit = (req.query.limit) ? Number(req.query.limit) : 20;
  const offset = (req.query.offset) ? Number(req.query.offset) : 0;
  const description_length = 200 || req.params.description_length;
  const page = 1 || req.params.page;
  try {
    const records = await Product.findAndCountAll();

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
          error: errorBody(404, "USR_05", "This product doesn't exist.", "product_id")
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
  const limit = (req.query.limit) ? Number(req.query.limit) : 20;
  const offset = (req.query.offset) ? Number(req.query.offset) : 0;
  const description_length = 200 || req.params.description_length;
  if (query_string !== '' || null) {
    try {
      const records = await Product.findAndCountAll({
        limit,
        offset,
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
  const limit = (req.query.limit) ? Number(req.query.limit) : 20;
  const offset = (req.query.offset) ? Number(req.query.offset) : 0;
  const { category_id } = req.params;

  try {
    const products = await ProductCategory.findAndCountAll({
      limit,
      offset, 
      where: { category_id },
       include: [{ model: Product }]
      })
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

  if (isNaN(Number(rating))) {
    res.status(400).send({ message: 'Must be a valid number' });
  } else {
    try {
      if (product_id.trim()) {
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
          customer_id: req.user.customer_id,
          created_on: Date.now()
        });
        return res.status(201).send({ message: 'review successful' })
      } else {
        res.status(400).send({
          error: errorBody(400, "USR_02", "product_id is required", "product_id")
        })
      }
    }
    catch (error) {
      next(error);
    }
  }
}

exports.getProductReviews = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const reviews = await Product.findAll({
      where: { product_id },
      include: [{
        model: Review,
        attributes: ['rating', 'review', 'created_on'],
        include: [{ model: Customer, attributes: ['name'] }]
      }]
    });
    if (!reviews) {
      return res.status(404).send({
        error: errorBody(404, "USR_05", "This product doesn't exist.", "product_id")
      });
    }
    const responseArr = [];
    reviews[0].Reviews.forEach((row) => {
      const responseObj = {
        name: row.Customer.name,
        review: row.review,
        rating: row.rating,
        created_on: row.created_on
      }
      responseArr.push(responseObj);
    })
    res.status(200).send(responseArr);
  }
  catch (error) {
    next(error);
  }
};
