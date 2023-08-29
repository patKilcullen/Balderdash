const Sequelize = require("sequelize")
const db = require("../db")



const Game = db.define("game", {
    name: {
        type: Sequelize.STRING,
        unique: true, 
    },
    rounds: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    roundsLeft: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    winner: {
        type: Sequelize.STRING, 
    },
    started: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
    },
    complete:  {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    },
    publicX: {
        type: Sequelize.BOOLEAN,
        defaultValue: true 
    },
    numPlayers: {
        type: Sequelize.INTEGER,

    },
    turn: {
        type: Sequelize.INTEGER,
    },


    // could add an ownerId depending on associations.. but the eager laoding wouldnt work
})

module.exports = Game