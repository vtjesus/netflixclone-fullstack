const { Router } = require('express');
const User = require("../models/User.js");
const { register, login } = require("../controllers/auth.js");

const router = Router();

// Registration

router.post("/register", register);

router.post("/login", login);




module.exports = router;