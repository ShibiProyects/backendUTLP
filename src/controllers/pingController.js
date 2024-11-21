const connection = require("../models/db");

module.exports.ping = (req, res) => {
  const consult = "SELECT * FROM user";

  try {
    connection.query(consult, (err, result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
};
