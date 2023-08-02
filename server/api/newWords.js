const router = require("express").Router()
const {
    models: { Word },
  } = require("../db");

const pool = require("../db/pgdb");

module.exports = router

// router.post("/", async (req,res,next)=>{
//     console.log("HI PPATTTYYYYYYYYYYY")
//     try {
//         const query = {
//           text: 'INSERT INTO "words" (word, defintion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *',
//           values: [req.body.word, req.body.definition, new Date(), new Date()],
//         };
//         const newWord = await pool.query(query);
//         console.log("BONERERERE: ", newWord.rows[0])
//         res.json(newWord.rows[0])     
//       } catch (err) {
//         console.error('Error posting the word:', err);
//       } 

// })

// Create Game
router.post("/", async (req, res, next) => {
    try {
      const game = await Word.create(req.body);
     
      res.json(game);
    } catch (err) {
      next(err);
    }
  });
  