
const { Pool } = require('pg');
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
const pool = new Pool({
    user: 'patkilcullen',
    host: 'localhost',
    database: databaseName,
    password: 'Throbbing1349!',
    port: 5432,
  }); 

  module.exports = pool