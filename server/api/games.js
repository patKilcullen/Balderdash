const router = require('express').Router()
const { models: { User, Game,Score }} = require('../db')
module.exports = router


// Get All Games
router.get('/', async (req, res, next) => {

    try {
      const games = await Game.findAll({include: [User,Score]})
     
      res.json(games)
    } catch (err) {
      next(err)
    }
  })

// Get Single Game
  router.get('/:id', async (req, res, next) => {

    try {
      const games = await Game.findByPk(req.params.id, {include: [User,Score]})
     console.log("GAMES: ", games)
      res.json(games)
    } catch (err) {
      next(err)
    }
  })

// Create Game
  router.post('/', async (req, res, next) => {
      try {
        const game = await Game.create(req.body)
        console.log("Created game in API: ", game)
        res.json(game)
      } catch (err) {
        next(err)
      }
    })