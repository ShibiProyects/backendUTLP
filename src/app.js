const express = require("express");

//.env
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });


const cors = require("cors");

//Swagger Import
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger/swaggerOptions");
const swaggerDocs = swaggerJsdoc(swaggerOptions);

const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const router = require("./routes");


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

// Swagger
app.get('/swagger.json', (req, res) => {
    res.status(200).json(swaggerDocs);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/',router);

//Global exception handler
app.use(globalErrorHandler);

module.exports = app;