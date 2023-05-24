const express = require('express')
const router = express.Router()
const Round = require("../models/rounds.js")

// GET ROUNDS
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


// GET Round by gameName and roundNumner
router.get('/rounds/:gameName/:round', async (req, res) => {
    try {
      const gameName = req.params.gameName;
      const roundNumber = req.params.round;
  
      // Find the round document by gameName and round
      const round = await Round.findOne({ gameName, roundNumber });
  
      if (!round) {
        return res.status(404).json({ error: 'Round not found' });
      }
  
      res.status(200).json(round);
    } catch (error) {
      console.error('Error retrieving round:', error);
      res.status(500).json({ error: 'Error retrieving round' });
    }
  });


// CREATE ROUND
router.post('/', async (req,res)=>{
    console.log("hHEERERERERERE", req.body)
    // console.log("hHEERERERERERE", req.body.round)
const round = new Round({
    gameName: req.body.gameName,
    round: req.body.round
})
try{
const newRound = await round.save()
console.log("NEW ROUND: ", newRound)
res.status(201).json(newRound)

}catch(error){
    res.status(400).json({message: error.message})
}
    
})

// UPDATE DEFINTION
router.post('/rounds/:id/definitions', async (req, res) => {
    try {
      const roundId = req.params.id;
      const { definition } = req.body;
  
      // Find the round document by ID
      const round = await Round.findById(roundId);
  
      if (!round) {
        return res.status(404).json({ error: 'Round not found' });
      }
  
      // Push the new definition object to the 'definitions' array
      round.definitions.push(definition);
  
      // Save the updated round document
      await round.save();
  
      res.status(200).json({ message: 'Definition added successfully' });
    } catch (error) {
      console.error('Error adding definition:', error);
      res.status(500).json({ error: 'Error adding definition' });
    }
  })


module.exports = router