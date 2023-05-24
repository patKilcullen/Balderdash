const router = require("express").Router();
const {
  models: { Rounds},
} = require("../db");
module.exports = router;

// Get All Games
router.get("/", async (req, res, next) => {
  try {
    const games = await Game.findAll({
      include: [{ model: User, as: "owner" }],
    });

    res.json(games);
  } catch (err) {
    next(err);
  }
});






// Create Game
router.post("/", async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
   
    res.json(game);
  } catch (err) {
    next(err);
  }
});
