const { Pool} = require("pg");
require("dotenv").config();



const awsPool = new Pool({
  user: process.env.awsUSERNAME,
  host: process.env.awsENDPOINT,
  database: process.env.awsDBNAME,
  password: process.env.awsPASSWORD,
  port: 5432,
});



module.exports = awsPool ;


