const Sequelize = require("sequelize")
const db = require("../db")



const Word = db.define("word", {

    word: {
        type: Sequelize.STRING, 
    },
    defintion: {
        type: Sequelize.STRING, 
    },
    createdAt: {
        type: Sequelize.DATE,
       
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
       
        allowNull: true
      },
})

module.exports = Word