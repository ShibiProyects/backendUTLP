const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "courses",
});

module.exports = connection;
