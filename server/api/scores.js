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
// All Score by GAme 
  router.get('/game/:gameId', async (req, res, next) => {
    try {
      const scores = await Score.findAll( {where: {gameId: req.params.gameId},include: [User, Game]})
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

  // doesn't use params
router.put('/:id', async(req,res,next)=>{
  try {
    const score = await Score.findOne({where: {userId: req.body.userId, gameId: req.body.gameId} })
  
    res.send(await score.update(req.body));
    // res.json(score)
  } catch (err) {
    next(err)
  }
})
 
// DELETE SCORE API
router.delete('/:gameId/:userId', async(req,res,next)=>{
  try {

    const score = await Score.findOne({where: {userId: req.params.userId, gameId: req.params.gameId} })

    res.send(await score.destroy());
    // res.json(score)
  } catch (err) {
    next(err)
  }
})