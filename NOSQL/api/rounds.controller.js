import roundsDAO from "../dao/roundsDAO.js"

export default class RoundsController {
  static async apiPostRound(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id
      const round = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const roundsResponse = await RoundsDAO.addround(
        restaurantId,
        userInfo,
        round,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateRound(req, res, next) {
    try {
      const roundId = req.body.round_id
      const text = req.body.text
      const date = new Date()

      const roundResponse = await roundsDAO.updateRound(
        roundId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = roundResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (roundResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update round - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteRound(req, res, next) {
    try {
      const roundId = req.query.id
      const userId = req.body.user_id
      console.log(roundId)
      const roundResponse = await roundsDAO.deleteRound(
        roundId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}