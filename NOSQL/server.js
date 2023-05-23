import express from "express"
import cors from "cors"
import rounds from "./api/rounds-routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/rounds', rounds)


app.use('*', (req, res) => {
    res.status(404).json({ error: "not found"})
  })


 export default app