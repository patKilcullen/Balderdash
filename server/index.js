const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');

// SOCKET
const socket = require('socket.io')

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

    // SOCKET
    const serverSocket = socket(server);
    serverSocket.on('connection', (socket) => {
      console.log(`Connection from client ${socket.id}`);
     
      socket.on("send_score", (data)=>{
        socket.broadcast.emit("receive_score", data)
      })
      socket.on("send_word", (data)=>{
        socket.broadcast.emit("receive_word", data)
      })
      socket.on("send_definition", (data)=>{
        socket.broadcast.emit("receive_definition", data)
      })
      socket.on("send_defArray", (data)=>{
         socket.broadcast.emit("receive_defArray", data)
      })
      socket.on("send_new_game", (data)=>{
        socket.broadcast.emit("receive_new_game", data)
     })
    });
    

  } catch (ex) {
    console.log(ex)
  }
}





init()
