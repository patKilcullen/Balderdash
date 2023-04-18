const router = require('express').Router()
const { models: { User, Game,Score }} = require('../db')
module.exports = router



router.get('/', async (req, res, next) => {

    try {
      const games = await Game.findAll({include: [User,Score]})
     
      res.json(games)
    } catch (err) {
      next(err)
    }
  })


  router.post('/', async (req, res, next) => {
  console.log("HIT POST GAME")
  console.log("REQ BODY: ", req.body)
      try {
        const game = await Game.create(req.body)
        console.log("Created game in API: ", game)
        res.json(game)
      } catch (err) {
        next(err)
      }
    })