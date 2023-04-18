//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Game = require('./models/Game')
const Score = require('./models/Score')

User.belongsToMany(Game, {through: Score})
// should be Game belong to user???
Game.belongsToMany(User, {through: Score})
// Game.hasMany(User)

Game.hasMany(Score)
Score.belongsTo(Game)

User.hasMany(Score)
Score.belongsTo(User)





//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Game,
    Score
  },
}
