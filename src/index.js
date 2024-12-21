//.env
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

const app = require('./app');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.SERVER_PORT}`);
  console.log(`Swagger http://localhost:${process.env.SERVER_PORT}/api-docs`);
});
