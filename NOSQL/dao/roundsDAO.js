import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let rounds

export default class RoundsDAO {
  static async injectDB(conn) {
    if (rounds) {
      return
    }
    try {
      rounds = await conn.db(process.env.ROUNDS).collection("rounds")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addRound(restaurantId, user, round, date) {
    try {
      const roundDoc = { name: user.name,
          user_id: user._id,
          date: date,
          text: round,
          restaurant_id: ObjectId(restaurantId), }

      return await rounds.insertOne(roundDoc)
    } catch (e) {
      console.error(`Unable to post round: ${e}`)
      return { error: e }
    }
  }

  static async updateround(roundId, userId, text, date) {
    try {
      const updateResponse = await rounds.updateOne(
        { user_id: userId, _id: ObjectId(roundId)},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update round: ${e}`)
      return { error: e }
    }
  }

  static async deleteround(roundId, userId) {

    try {
      const deleteResponse = await rounds.deleteOne({
        _id: ObjectId(roundId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete round: ${e}`)
      return { error: e }
    }
  }

}