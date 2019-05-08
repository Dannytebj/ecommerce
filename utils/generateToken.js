const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @description When called, this function generates a
 * token
 * @param {Object} user request object
 * @return {string} token
 */
module.exports = function generateToken (user) {
  const token = jwt.sign({ token: { user } }, process.env.SECRET, { expiresIn: '1d' });
  return `Bearer ${token}`;
};
