const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const upload = require("../config/upload");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
