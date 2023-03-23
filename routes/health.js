const express = require("express");
const router = express.Router();

const { health } = require("../controllers/health");

router.route("/ping").get(health);

module.exports = router;
