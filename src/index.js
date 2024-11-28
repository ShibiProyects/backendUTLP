const express = require("express");

//.env
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });


const cors = require("cors");

//Swagger Import
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");

const endPoints = require("./api/endPoints");

//Start
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);

app.use("/", endPoints);

//Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ["./src/api/**.js"], // Ajusta el path de tus rutas aquí
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//END-Swagger

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port http://localhost:${process.env.SERVER_PORT}`);
  console.log(`swagger http://localhost:${process.env.SERVER_PORT}/api-docs`);
});
