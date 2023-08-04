const router = require('express').Router()
const { models: { User, Game,Score }} = require('../db')

const pool = require("../db/pgdb");
// const Sequelize = require("sequelize")
module.exports = router



router.get('/', async (req, res, next) => {
    try {
      const scores = await Score.findAll({include: [User, Game]})
      res.json(scores)
    } catch (err) {
      next(err)
    }
  })
// All Score by GAme 
  router.get('/game/:gameId', async (req, res, next) => {
    try {
      const scores = await Score.findAll( {where: {gameId: req.params.gameId},include: [Game, User]})
      res.json(scores)
    } catch (err) {
      next(err)
    }
  })

 
  // Highest Scores by GAme 
  router.get('/game/:gameId/highestScores', async (req, res, next) => {


    try {
      const max = await Score.max('score', { where: {gameId: req.params.gameId}})

      const maxScores = await Score.findAll({ where: {score: max, gameId: req.params.gameId}, include: [User]})
      console.log("MAX SCORES: ", maxScores)
      res.json(maxScores)
    
    } catch (err) {
      next(err)
    }
  })




  router.post('/', async (req, res, next) => {
    
    try {
     
      const score = await Score.create(req.body)

      res.json(score)
    } catch (err) {
      next(err)
    }
  })

  // doesn't use params
router.put('/:id', async(req,res,next)=>{
  try {
    const score = await Score.findOne({where: {userId: req.body.userId, gameId: req.body.gameId} })
  
    res.send(await score.update(req.body));
    // res.json(score)
  } catch (err) {
    next(err)
  }
})

// Add Point 
// router.put('/:id/addPoint', async(req,res,next)=>{

//   try {
//     const score = await Score.findOne({where: {userId: req.body.userId, gameId: req.body.gameId}, include: [User] })
    
//     score.score += 1;
    
//     res.send(await score.save());
//   } catch (err) {
//     next(err)
//   }
// })



router.put('/:id/addPoint', async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const gameId = req.body.gameId;
    
      const updateQuery = `
        UPDATE scores
        SET score = score + 1
        WHERE "userId" = $1 AND "gameId" = $2
        RETURNING *;
      `;


      const updateValues = [userId, gameId];
      await pool.query(updateQuery, updateValues);

      // const query = `
      // SELECT * FROM scores 
      // WHERE "userId" = $1 AND "gameId" = $2
      // JOIN users ON users."id" = scores."userId"`

      const query = `SELECT scores.*, users.username as user_username
      FROM scores
      INNER JOIN users ON scores."userId" = users.id
      WHERE scores."userId" = $1 AND scores."gameId" = $2;`

      const updateResult = await pool.query(query,updateValues)
console.log("UPDATED RESULT: ", updateResult.rows[0])
      res.send(updateResult.rows[0]);
   
  } catch (err) {
    next(err);
  }
});


// router.put('/:id/addPoint', async (req, res, next) => {
//   try {
//     const userId = req.body.userId;
//     const gameId = req.body.gameId;
    
//       const updateQuery = `
//       UPDATE scores
//       SET score = score + 1
//       OUTPUT INSERTED.score, users."username"
//       FROM scores
//       INNER JOIN users ON scores."userId" = users.id
//       WHERE scores."userId" = $1 AND scores."gameId" = $2;;
//       `;

//       const updateValues = [userId, gameId];
//       const updateResult = await pool.query(updateQuery, updateValues);


//       res.send(updateResult.rows[0]);
   
//   } catch (err) {
//     next(err);
//   }
// });



// router.put('/:id/addPoint', async (req, res, next) => {
//   try {
//     const userId = req.body.userId;
//     const gameId = req.body.gameId;
//     console.log("USERID: ", userId)
//     console.log("GAMEID: ", gameId)

//     // Get the current score
//     const query = `
//       SELECT * FROM scores
//       WHERE "userId" = $1 AND "gameId" = $2;
//     `;

//     const values = [userId, gameId];
//     const result = await pool.query(query, values);
//     const score = result.rows[0];

//     if (!score) {
//       // If the score record doesn't exist, create a new one
//       const createQuery = `
//         INSERT INTO scores ("userId", "gameId", score, "createdAt", "updatedAt")
//         VALUES ($1, $2, 1, NOW(),NOW())
//         RETURNING *;
//       `;

//       const createValues = [userId, gameId];
//       const createResult = await pool.query(createQuery, createValues);
//       res.send(createResult.rows[0]);
//     } else {
//       // If the score record exists, update the score
//       const updateQuery = `
//         UPDATE scores
//         SET score = score + 1
//         WHERE "userId" = $1 AND "gameId" = $2
//         RETURNING *;
//       `;

//       const updateValues = [userId, gameId];
//       const updateResult = await pool.query(updateQuery, updateValues);
//       res.send(updateResult.rows[0]);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// Add Point 
// router.put('/:id/addPoint', async(req,res,next)=>{

//   try {
//     const query = {
//       text: 
        
       
//           `UPDATE "scores" AS s
//           SET score = score + 1
//           FROM users AS u
//           JOIN games AS g ON s."gameId" = g."id"
//           WHERE s.userId = u.id
//             AND u.id = ${req.body.userId}
//             AND g.id = ${req.body.gameId};
//           `
   
//     };

//     const updatedScore = await pool.query(query)
//     console.log("updatedScore: ", updatedScore.rows[0])
//     res.json(updatedScore.rows[0])
//   } catch (err) {
//     next(err)
//   }
// })
// -- Assuming "scores" is the name of the scores table
// -- and the primary key of the "scores" table is "id"

// -- Begin a transaction (optional, depending on your requirements)
// BEGIN;

// -- Update the score by 1 for a specific userId and gameId
// UPDATE scores
// SET score = score + 1
// WHERE userId = 'your_user_id' AND gameId = 'your_game_id';

// -- Fetch the updated score data for the specified userId and gameId
// SELECT s.*, u.*
// FROM scores AS s
// JOIN users AS u ON s.userId = u.id
// WHERE s.userId = 'your_user_id' AND s.gameId = 'your_game_id';

// -- Commit the transaction (optional, depending on your requirements)
// COMMIT;

 
// DELETE SCORE API
router.delete('/:gameId/:userId', async(req,res,next)=>{
  try {

    const score = await Score.findOne({where: {userId: req.params.userId, gameId: req.params.gameId} })

    res.send(await score.destroy());
    // res.json(score)
  } catch (err) {
    next(err)
  }
})