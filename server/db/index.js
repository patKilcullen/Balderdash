//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Game = require('./models/Game')
const Score = require('./models/Score')
const Word = require('./models/Word')


// User.belongsToMany(Game, {through: Score})
// Game.belongsToMany(User, {through: Score})

// Game.hasMany(Score)*
// Score.belongsTo(Game) *

// User.hasMany(Score)*
// Score.belongsTo(User) *

// ********
// Game.belongsTo(User, { as: 'owner' });
// User.hasMany(Game, { foreignKey: 'ownerId' });

// Score.belongsTo(User);
// Score.belongsTo(Game);

// User.hasMany(Score);
// Game.hasMany(Score);

Game.belongsTo(User, { as: 'owner' });
Game.belongsToMany(User, { through: Score });

User.belongsToMany(Game, { through: Score });

Score.belongsTo(User);
Score.belongsTo(Game);

User.hasMany(Score);
Game.hasMany(Score);




//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Game,
    Score, 
    Word
  },
}
