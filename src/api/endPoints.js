const express = require("express");
const { ping } = require("../controllers/pingController");
const { register } = require("../controllers/user/register.controller");
const { login } = require("../controllers/user/login.controller");
const router = express.Router();

router.get("/ping", ping);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
