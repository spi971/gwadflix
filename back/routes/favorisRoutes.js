const { addToFavoris, getFavoris, removeFromFavoris } = require("../controllers/favorisController");

const router = require("express").Router();

router.post("/add", addToFavoris);
router.put("/remove", removeFromFavoris);
router.get("/list/:userId", getFavoris);

module.exports = router;
