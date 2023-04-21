const router = require("express").Router();
const {
  models: { User, Game, Score },
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


// Get All Users Games
// router.get("/", async (req, res, next) => {
//   try {
//     const games = await Game.findAll({ where: {},
//       include: [{ model: User, as: "owner" }],
//     });

//     res.json(games);
//   } catch (err) {
//     next(err);
//   }
// });



// Get Single Game
router.get("/:id", async (req, res, next) => {
  try {
    // const games = await Game.findByPk(req.params.id, {include: [User,Score]})
    const games = await Game.findByPk(req.params.id, {
      include: [
        {
          model: Score,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: User,
         as: "owner",
        },
      ],
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
    console.log("Created game in API: ", game);
    res.json(game);
  } catch (err) {
    next(err);
  }
});
