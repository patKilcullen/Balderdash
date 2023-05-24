const mongoose = require('mongoose')


// const roundsSchema = new mongoose.Schema({
// game: {
// type: String
// },
// round: {
//     type: Number
//     },
// definition: [
//     {
//         type: Schema.Types.Mixed
//     }
// ]

// })


const roundSchema = new mongoose.Schema({
    gameName: String,
    word: String,
    definitions: [
      {
        type: mongoose.Schema.Types.Mixed,
        // or type: Schema.Types.ObjectId if the objects have a separate schema
      },
    ],
    roundNumber: {
            type: Number
            },
    
  });

module.exports = mongoose.model('Round', roundSchema)