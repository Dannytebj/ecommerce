const { Department } = require('../models');

exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.findAll();
    if (!departments) {
      return res.status(200).send({ message: 'No departments' })
    }
    return res.status(200).send(departments);
  }
  catch (error) {
    next(error);
  }
};

exports.getSingleDepartment = async (req, res, next) => {
  const { department_id } = req.params
  try {
      const department = await Department.findOne({ where: { department_id }});
      if (!department) {
        return res.status(404).send({ 
          message: `Department with id ${department_id} not found`
        });
      }
      return res.status(200).send(department);
  }
  catch (error) {
    next(error);
  }
};