const router = require('express').Router()
const { models: { User, Game,Score }} = require('../db')
module.exports = router



router.get('/', async (req, res, next) => {
    try {
      const users = await Score.findAll({include: [User,Score]})
      res.json(users)
    } catch (err) {
      next(err)
    }
  })