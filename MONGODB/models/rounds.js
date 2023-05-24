const mongoose = require('mongoose')


const roundsSchema = new mongoose.Schema({
game: {
type: String
},
round: {
    type: Number
    },


})

module.exports = mongoose.model('Round', roundsSchema)