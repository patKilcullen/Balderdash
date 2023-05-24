require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error)=> console.log(error))
db.once('open', ()=> console.log("connected to database" + db.name))

app.use(express.json())



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

const roundsRouter = require('./routes/rounds')
app.use('/rounds', roundsRouter)


app.listen(3000, ()=> console.log("SERVERR HAS STARREDDD"))