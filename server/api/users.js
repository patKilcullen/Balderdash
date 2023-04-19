const router = require('express').Router()
const { models: { User, Score, Game }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log("HIT DIS YEAHH?????")
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
console.log("HELLLEEEEEEOOO", req.params.id)
  try {
    // const games = await Game.findByPk(req.params.id, {include: [User,Score]})
    const user = await User.findByPk(req.params.id, {include: [Game, Score]})
    console.log("USERRRRRR: ", user)
   
    res.json(user)
  } catch (err) {
     next(err)
  }
})

// const games = await Game.findByPk(req.params.id, {include: [{
//   model: Score,
//   include: [{
//     model: User,
//     // attributes: ['username']
//   }]
// },
// {
//   model: User,
//   // include: [{
//   //   model: User,
//   //   // attributes: ['username']
//   // }]
// }


// ]})
