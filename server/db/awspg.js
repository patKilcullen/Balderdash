const { Pool, Client } = require("pg");
require("dotenv").config();



const awsPool = new Pool({
  user: "patKilcullen",
  host: "bald.ckkwfqcrjn8n.us-east-2.rds.amazonaws.com",
  database: "postgres",
  password: "Throbbing1349!",
  port: 5432,
});



module.exports = awsPool ;





// const express = require("express");
// const { Pool } = require("pg");

// const app2 = express();
// const port = 4002;

// // PostgreSQL database configuration
// const awsPool = new Pool({
//   user: "postgres",
//   host: "balderdash.ckkwfqcrjn8n.us-east-2.rds.amazonaws.com",
//   database: process.env.awsDBNAME,
//   password: process.env.awsPASSWORD,
//   port: 5432,
// });

// module.exports = awsPool; 
// app2.use(express.json());



// app2.post("/", async (req, res, next) => {
//   try {
//     console.log("BONER")
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

// // Define a route to handle the POST request
// // app.post("/insert_data", async (req, res) => {
// //   try {
// //     const { data } = req.body;

// //     // Insert data into the database
// //     const query = "INSERT INTO your_table (column_name) VALUES ($1)";
// //     const values = [data]; // Replace with your table and column names

// //     const result = await pool.query(query, values);

// //     res.status(201).json({ message: "Data inserted successfully" });
// //   } catch (error) {
// //     console.error("Error:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// app2.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });