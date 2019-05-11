const { Category } = require('../models');

exports.getCategories = async (req, res, next) => {
  const limit = 20 || req.params.limit;
  const offset = 0 || req.params.offset;
  const page = 1 || req.params.page;
  try {
    const records = await Category.findAndCountAll();

    if (records) {
      const categories = await Category.findAll({
        limit,
        offset,
        order: ['category_id', 'name']
      });
      if (!categories) {
        return res.status(200).send({ message: 'No categories' })
      }
      return res.status(200).send({
        count: records.count,
        rows: categories,
      });
    } else {
      return res.status(200).send({ message: 'No categories' })
    }

  }
  catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getSingleCategory = async (req, res, next) => {
  const { category_id } = req.params
  try {
      const category = await Category.findOne({ where: { category_id }});
      if (!category) {
        return res.status(404).send({ 
          message: `Category with id ${category_id} not found`
        });
      }
      return res.status(200).send(category);
  }
  catch (error) {
    next(error);
  }
};

exports.getCategoriesOfDepartment = async (req, res, next) => {
const { department_id } = req.params;
  try {
    const categories = await Category.findAll({ where: { department_id }})
    if (!categories) {
      return res.status(200).send({ message: 'No categories' })
    }
    return res.status(200).send(categories);
  }
  catch(error) {
    console.log(error)
    next(error);
  }
};
