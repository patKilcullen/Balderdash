const router = require("express").Router()

// const pool = require("../db/pgdb");
// const { Pool, Client } = require("pg");
require("dotenv").config();
const awsPool = require("../db/awspg");

 module.exports = router




router.post("/", async (req,res)=>{
    console.log("HI PPATTTYYYYYYYYYYY: ", req.body.word, req.body.definition);
    try {
        const query = {
          text: 'INSERT INTO words (word, definition) VALUES ($1, $2)',
          values: [req.body.word, req.body.definition],
        };
        // const query = `INSERT INTO "words" (word, definition) VALUES (${req.body.word}, ${req.body.definition})`;
        console.log("")
        const newWord = await awsPool.query(query);
        console.log("AWSPOOOL: ", newWord)
        // res.json(newWord.rows[0])     
      } catch (err) {
        console.error('Error posting the word:', err);
      } 
})

