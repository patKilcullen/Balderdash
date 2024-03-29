const router = require('express').Router()
const { models: { User, Score, Game }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {

  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],include:[{model: Game},{model: Score, include: [{model: User}]} ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})







router.get('/:id', async (req, res, next) => {

  try {
   
    const user = await User.findByPk(req.params.id, {include: [Game, Score]})

   
    res.json(user)
  } catch (err) {
     next(err)
  }
})
