const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");

// SOCKET
const socket = require("socket.io");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );

    // SOCKET
    const serverSocket = socket(server);

    serverSocket.on("connection", (socket) => {
      // console.log(`Connection from client ${socket.id}`);

      socket.on("send_new_game", (data) => {
        socket.broadcast.emit("receive_new_game", data);
      });
    
socket.on("join_room", ({room, userName})=>{
console.log(`${userName} joined room ${room}`)
  socket.join(room)
})
  socket.on("send_new_game", (data) => {
        socket.broadcast.emit("receive_new_game", data);
      });
    
      socket.on("send_word", ({word, room, playerTurnName}) => {
console.log("PLAYER TURN NAME IN SEND WORD: ", playerTurnName)
        socket.to(room).emit("receive_word", {word, room,playerTurnName });
       
      });

// Countdown Socket

socket.on("start_countdown", ({gameName})=>{
  console.log("GAME NAME IN RECUESVE STATR: ", gameName)
  socket.to(gameName).emit("receive_start_countdown", gameName)
})


// PLAYER DEFINITIONS
socket.on("send_player_fake_def", ({playerDef, room, userId,playerTurnName})=>{
  console.log("HIYYYAAAAA: ", playerDef, room, userId,playerTurnName)
  socket.to(room).emit("receive_player_fake_def", {playerDef, room, userId,playerTurnName})
  // socket.to(gameName).emit("receive_player_fake_def",{playerDef, gameName, userId, playerTurnName})
})

socket.on("start_countdown", ({gameName})=>{
  console.log("GAME NAME IN RECUESVE STATR: ", gameName)
  socket.to(gameName).emit("receive_start_countdown", gameName)
})

socket.on("send_fake_defs", ({fakeDefinitions, gameName})=>{
  console.log("Gam in send fake defs: ", gameName)
  console.log("fake defs in send fake defs: ", fakeDefinitions)
  socket.to(gameName).emit("receive_fake_defs", fakeDefinitions)
})



socket.on("send_player_turn_name", ({playerTurnName, gameName})=>{
console.log("SEND PLAYER TURN NAME: ", playerTurnName)
  socket.to(gameName).emit("receive_player_turn_name", {playerTurnName, gameName})
})



// IN DBGamePlay
      socket.on("send_player_def", ({room, playerDef}) => {
console.log("PLAYER EF AND ROOM: ", playerDef, room)
        socket.to(room).emit("receive_player_def", playerDef);
      
      });


      socket.on('requestInfo', ({playerTurn, userName, room}) => {
        console.log("REQUEST INFOOOOO")
        socket.to(room).emit("request_word", {playerTurn,userName, room});
        
        // socket.to(targetSocketId).emit('infoRequestReceived', 'Request received!')

        // console.log("BONNNNERRRRRRR", targetSocketId)
        // const targetSocket = serverSocket.get(targetSocketId);
        // console.log("TARGET SOCKET: ", targetSocket)
        // if (targetSocket) {
        //   console.log("FUCK YOU")
        //   // Emit request event to the target socket
        //   targetSocket.emit('infoRequestReceived', 'Request received!');
        // }
      })
     socket.on('send_existing_word', ({word,room,userName})=>{
console.log("SEND EXISTING WORD", word)
      socket.to(room).emit("retrieve_eixsting_word", {word,userName})
     })


    

   

      // socket.on("send_score", (data) => {
      //   socket.broadcast.emit("receive_score", data);
      // });
      // socket.on("send_word", (data) => {
      //   socket.broadcast.emit("receive_word", data);
      // });

      // socket.on("send_definition", (data) => {
      //   console.log(data);
      //   socket.broadcast.emit("receive_definition", data);
      // });

      // socket.on("send_defArray", (data) => {
      //   socket.broadcast.emit("receive_defArray", data);
      // });




    

      

    });



  } catch (ex) {
    console.log(ex);
  }
};

init();
