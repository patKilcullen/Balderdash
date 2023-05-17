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

socket.on("join_room", (room)=>{
console.log("MOFO JOINED THE RRROM")
  socket.join(room)
})



      // NEW

      socket.on("send_word", ({word, room}) => {

        socket.to(room).emit("receive_word", {word, room});
       
      });

      socket.on("send_player_def", ({room, playerDef}) => {
console.log("PLAYER EF AND ROOM: ", playerDef, room)
        socket.to(room).emit("receive_player_def", playerDef);
       
      });




    

   

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
      socket.on("send_new_game", (data) => {
        socket.broadcast.emit("receive_new_game", data);
      });
    

      

    });



  } catch (ex) {
    console.log(ex);
  }
};

init();
