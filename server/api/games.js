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

// GET SINGLE GAME
router.get("/findGame/:gameName", async (req, res, next) => {
console.log("GAME NAME IN ROUTE: ", req.params.gameName)


  try {
    const game = await Game.findOne({
      where: {name: req.params.gameName},
      include: [{ model: User, as: "owner" }],
    });
console.log("FOUND ASS GAME: ", game)
    res.json(game);
  } catch (err) {
    console.log("GAME NOT FOUND")
    next(err);
  }
});





// UPDATE GAME
router.put('/:gameId', async(req,res,next)=>{
  try {
    const game = await Game.findByPk(req.params.gameId)
    
    res.send(await game.update(req.body));
    // res.json(score)
  } catch (err) {
    next(err)
  }
})


router.patch('/:gameId/changeTurn', async(req,res,next)=>{
  
  try {
    const game = await Game.findByPk(req.params.gameId)
    
    res.send(await game.update(req.body));
    // res.json(score)
  } catch (err) {
    next(err)
  }
})

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
   
    res.json(game);
  } catch (err) {
    next(err);
  }
});
