/**
 * Helper that maintains error structure
 *
 * @param {int} status - error status code
 * @param {string} code - predefined code e.g 'USR_01
 * @param {string} message - error message
 * @param {string} field - affected field(s)
 * 
 * @returns {object}
 */
module.exports = (status, code, message, field) => {
  return {
    status,
    code,
    message,
    field
  }
};
