const Sequelize = require("sequelize")
const db = require("../db")



const Game = db.define("game", {
    name: {
        type: Sequelize.STRING, 
    },
    rounds: {
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
    public: {
        type: Sequelize.BOOLEAN,
        defaultValue: true 
    }

    // could add an ownerId depending on associations.. but the eager laoding wouldnt work
})

module.exports = Game