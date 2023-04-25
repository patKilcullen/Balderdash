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

  // doesn't use params
router.put('/:id', async(req,res,next)=>{
  try {
    const score = await Score.findOne({where: {userId: req.body.userId, gameId: req.body.gameId} })
    console.log("SCOREdfef: ", score)
    res.send(await score.update(req.body));
    res.json(score)
  } catch (err) {
    next(err)
  }
})
 
// DELETE SCORE API
router.delete('/:gameId/:userId', async(req,res,next)=>{
  try {

    const score = await Score.findOne({where: {userId: req.params.userId, gameId: req.params.gameId} })
    console.log("SCORE TO DELETEEEE: ", score)
    res.send(await score.destroy());
    res.json(score)
  } catch (err) {
    next(err)
  }
})