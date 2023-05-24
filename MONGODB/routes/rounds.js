const express = require('express')
const router = express.Router()
const Round = require("../models/rounds.js")


router.get('/', async (req,res)=>{
try {
const rounds = await  Round.find()
res.send(rounds)
}
catch(error) {
console.log("ERROR IN GET ROUDNSSSS")
res.status(500).json({message: error.message})
}

})



router.post('/', async (req,res)=>{
    console.log("hHEERERERERERE", req.body)
    // console.log("hHEERERERERERE", req.body.round)
const round = new Round({
    game: req.body.game,
    round: req.body.round
})
try{
const newRound = await round.save()
res.status(201).json(newRound)

}catch(error){
    res.status(400).json({message: error.message})
}
    
})


module.exports = router