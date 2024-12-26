/**
 *
 * @param {number} id
 * @returns {boolean}
 */
const validateIntegerNumber = function (id) {
    return !Number.isInteger(id) || id <= 0;
}
module.exports = validateIntegerNumber;