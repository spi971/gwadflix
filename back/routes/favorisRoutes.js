const { addToFavoris } = require("../controllers/favorisController");

const router = require("express").Router();

router.post("/add", addToFavoris);

module.exports = router;
