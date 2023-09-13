const router = require("express").Router()

// const pool = require("../db/pgdb");
// const { Pool, Client } = require("pg");
require("dotenv").config();
const awsPool = require("../db/awspg");

 module.exports = router




router.post("/", async (req,res)=>{
    try {
        const query = {
          text: 'INSERT INTO words (word, definition) VALUES ($1, $2) RETURNING *',
          values: [req.body.word, req.body.definition],
        };
        const newWord = await awsPool.query(query);
        console.log("AWSPOOOL: ", newWord.rows[0])
        res.send(newWord.rows[0])     
      } catch (err) {
        console.error('Error posting the word:', err);
      } 
})

