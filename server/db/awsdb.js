// const express = require("express");
// const { Pool } = require("pg");

// const app2 = express();
// const port = 4002;

// // PostgreSQL database configuration
// const awsPool = new Pool({
//   user: process.env.awsUSERNAME,
//   host: process.env.awsENDPOINT,
//   database: process.env.awsDBNAME,
//   password: process.env.awsPASSWORD,
//   port: 5432,
// });

// module.exports = awsPool;
// app2.use(express.json());

// app2.post("/", async (req, res, next) => {
//   try {
//     console.log("BONER");
//     const query = {
//       text: 'INSERT INTO "words" (word, defintion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4)',
//       values: [req.body.word, req.body.definition],
//     };
//     const newWord = await awsPool.query(query);
//     console.log("BONERERERE: ", newWord.rows[0]);
//     res.json(newWord.rows[0]);
//   } catch (err) {
//     console.error("Error posting the word:", err);
//   }
// });



// app2.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
