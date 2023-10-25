
const { Pool } = require('pg');
require('dotenv').config();
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const pool = new Pool({
    user: process.env.pgUSERNAME,
    host: 'localhost',
    database: databaseName,
    password: process.env.pgPASSWORD,
  port: 5432,
  }); 

  

  module.exports = pool