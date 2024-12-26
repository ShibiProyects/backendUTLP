const bcrypt = require("bcrypt");

/**
 *
 * @param {string}password
 * @returns {Promise<void|*>}
 */
const HashHelper = async function (password) {
    if (!password) throw new Error("Password is required");
    return bcrypt.hash(password, 3);
}

module.exports = HashHelper;