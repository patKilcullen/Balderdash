const router = require("express").Router();
const {
  models: { User, Game, Score },
} = require("../db");

const pool = require("../db/pgdb");

module.exports = router;


router.get("/", async (req, res, next) => {
  try {
    const scores = await Score.findAll({ include: [User, Game] });
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// All Score by GAme
router.get("/game/:gameId", async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      where: { gameId: req.params.gameId },
      include: [Game, User],
    });
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// Highest Scores by GAme
router.get("/game/:gameId/highestScores", async (req, res, next) => {
  try {
    const max = await Score.max("score", {
      where: { gameId: req.params.gameId },
    });

    const maxScores = await Score.findAll({
      where: { score: max, gameId: req.params.gameId },
      include: [User],
    });
    res.json(maxScores);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const score = await Score.create(req.body);

    res.json(score);
  } catch (err) {
    next(err);
  }
});

// doesn't use params
router.put("/:id", async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: { userId: req.body.userId, gameId: req.body.gameId },
    });

    res.send(await score.update(req.body));
    // res.json(score)
  } catch (err) {
    next(err);
  }
});

// Add Point
router.put("/:id/addPoint", async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: { userId: req.body.userId, gameId: req.body.gameId },
      include: [User],
    });

    score.score += 1;
    res.send(await score.save());
  } catch (err) {
    next(err);
  }
});

// Add 3 Points
router.put("/:id/add3Points", async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: { userId: req.body.userId, gameId: req.body.gameId },
      include: [User],
    });

    score.score += 3;
    res.send(await score.save());
  } catch (err) {
    next(err);
  }
});

// Subtract 3 Points
router.put("/:id/subtract3Points", async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: { userId: req.body.userId, gameId: req.body.gameId },
      include: [User],
    });

    score.score -= 3;
    res.send(await score.save());
  } catch (err) {
    next(err);
  }
});


// ADD POINT 2 USES RAW SQL but doesn't return user in requires format
router.put("/:id/addPoint2", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const gameId = req.body.gameId;

    const updateQuery = `
      UPDATE scores
      SET score = score + 1
      WHERE "userId" = $1 AND "gameId" = $2
      RETURNING *, (SELECT username FROM users WHERE id = scores."userId");
      `;

    const updateValues = [userId, gameId];
    const updateResult = await pool.query(updateQuery, updateValues);

    res.send(updateResult.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE SCORE API
router.delete("/:gameId/:userId", async (req, res, next) => {
  try {
    const score = await Score.findOne({
      where: { userId: req.params.userId, gameId: req.params.gameId },
    });

    res.send(await score.destroy());
    // res.json(score)
  } catch (err) {
    next(err);
  }
});
