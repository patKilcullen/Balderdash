const Sequelize = require("sequelize")
const db = require("../db")



const Word = db.define("word", {

    word: {
        type: Sequelize.STRING, 
    },
    defintion: {
        type: Sequelize.STRING, 
    },
})

module.exports = Word