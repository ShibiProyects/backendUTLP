const mysql2 = require("mysql2");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });


function createConnection(){
  const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      throw err;
    }
    console.log("Connected to the database.");
  });

  return connection;
}


module.exports = createConnection;
