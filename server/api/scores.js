const router = require('express').Router()
const { models: { User, Game,Score }} = require('../db')
module.exports = router



router.get('/', async (req, res, next) => {
    try {
      const scores = await Score.findAll({include: [User, Game]})
      res.json(scores)
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const score = await Score.create(req.body)
      res.json(score)
    } catch (err) {
      next(err)
    }
  })

  
