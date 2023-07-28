const router = require("express").Router()

// const {
//     models: { Word, Score },
//   } = require("../db");

const pool = require("../db/pgdb");

module.exports = router



router.post("/", async (req,res,next)=>{
    console.log("HELLO FROM HEREEEE")
    try{
        const word = Word.create((req.body))

        res.json(word)

    }catch(err){
        console.log("ERROR IN POST WORD ROUTE: ", err)
        next(err)
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
