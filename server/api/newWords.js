const router = require("express").Router()



const { DATE } = require("sequelize");
const pool = require("../db/pgdb");

module.exports = router



router.post("/pg", async (req,res,next)=>{
    try {
        const query = {
          text: 'INSERT INTO "words" (word, defintion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4)',
          values: [req.body.word, req.body.definition, new Date(), new Date()],
        };
    
        const client = await pool.connect();
        await client.query(query);
        client.release();
        console.log(`Successfully posted the word "${req.body.word}" with its definition.`);
      } catch (err) {
        console.error('Error posting the word:', err);
      } finally {
        pool.end(); // Close the pool (optional, if your application is ending)
      }
})


router.get("/pg", async (req,res,next)=>{
    console.log("HI FROM THE BACK END")
    try{
        console.log("POOL : ", pool)
        const client = await pool.connect();
        const query = 'SELECT * FROM "scores"';
        const result = await client.query(query);
        console.log('Raw query result:', result.rows);
    }catch(err){
        console.log("ERROR IN POST WORD ROUTE: ", err)
        next(err)
    }
})
