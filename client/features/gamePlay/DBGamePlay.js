
// CURRENTLY INCLUDES SOCKET LOGIC for use owf word, but could be used for putting the word in that database
import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectWord,
  getWord,
  selectDefinition,
  getDefinition,
  getFakeWords,
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  clearFakeDefs,
  clearFakeWords,
  clearDefinition,
  addWordPlayerNotTurn,
} from "./gamePlaySlice";
import { selectMe } from "../auth/authSlice";

// SOCKET
// could/should this be imported from app/socket.js??????
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DBGamePlay = ({ userId, game, userScore }) => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const username = me.username;
const gameName = game.name
const [word, setWord] = useState("")
const [wordOwner, setWordOwner] = useState("")
const [wordSocket, setWordSocket] = useState("")
const [wordStorage, setWordStorage] = useState("")
  // SOCKET
  const clientSocket = useContext(SocketContext);


  const handleGetWord = () => {
    dispatch(getWord()).then((res) => {

        localStorage.setItem(`${gameName}-word`, res.payload[0]);
        clientSocket.emit("send_word", { word: res.payload[0], room: gameName });
        setWordOwner(res.payload[0])
        setWord(res.payload[0])

    });
  
  };
  
// Player joins socket room every time the gameName changes




  useEffect(() => {
    
      const wordFromStorage  = localStorage.getItem(`${game.id}-word`)
      console.log("WORD FROM STORAGE: ", wordFromStorage )
    //   dispatch(addWordPlayerNotTurn(wordFromStorage))
    //   setThisWord(wordFromStorage)
     userScore ?
    clientSocket.emit("join_room", {room: gameName, userName: username} )
     :null


     
  }, [gameName]);

  // SOCKET - Receive info from client socket
//   useEffect(() => {
//     clientSocket.on("receive_word", ({ word, room }) => {
//         // console.log(`B-WORD: ${word} B-ROOM: ${room} B-GameNAme: ${gameName}`)

//        if(room === gameName) {
//         // console.log(`A-WORD: ${word} A-ROOM: ${room} A-GameNAme: ${gameName}`)
//             setWordSocket(`WORDL ${word} Room: ${room} gameName: ${gameName}`)
//             setWord(word)
        
//     }else{
//          setWordSocket('')
//          setWord('')
//     }
//     });

//   }, [clientSocket, gameName]);

useEffect(() => {
    clientSocket.on("receive_word", ({ word, room }) => {
        // console.log(`B-WORD: ${word} B-ROOM: ${room} B-GameNAme: ${gameName}`)

    room === gameName ?
        // console.log(`A-WORD: ${word} A-ROOM: ${room} A-GameNAme: ${gameName}`)
            setWordSocket(`WORDL ${word} Room: ${room} gameName: ${gameName}`)
          &&  setWord(word)
        
    :
         setWordSocket('')
        //  setWord('')
    
    });

  }, [clientSocket, gameName]);









//   REcEIVE WORD ALREADY PLAYEDD

const playerTurn = game.scores.filter((score)=> score.turn === true)
useEffect(()=>{
   
    clientSocket.emit('requestInfo', {playerTurn: playerTurn[0].user.username, userName: username, room: gameName})
  
}, [gameName])


clientSocket.on('request_word',({playerTurn,userName, room})=>{
    console.log("REQUEST WORDDDDDD")
console.log("INFOOO: ", playerTurn,userName, room)
if(playerTurn === username){
    console.log("player turn and user name the same")
clientSocket.emit('send_existing_word',{word: word, room: room, userName: userName} )

}else{
console.log("dd")
}
})

clientSocket.on("retrieve_eixsting_word", ({word, userName})=>{
if(userName === username){
    console.log("EXISTING WORRRRRRDDDDDD: ", word)
}

})

    // clientSocket.on('requestInfo', () => {
    //     // Gather the required information
    //     const info = 'Some information';
      
    //     // Emit response event directly to the requesting socket
    //     clientSocket.emit('infoRequestReceived', info);
    //   });

      clientSocket.on('requestInfo', () => {
        // Gather the required information
        const info = 'Some information';
      
        // Emit response event directly to the requesting socket
        socket.emit('infoRequestReceived', info);
      });

   

      clientSocket.on('infoRequestReceived', (response) => {
        console.log("did response", response); // Handle the received information
      }); 


  
  console.log("player turn: ", playerTurn[0].user.username)

  useEffect(()=>{

     clientSocket.emit('requestInfo', playerTurn[0].user.username);

    // Listen for response event from the server
 
    

  },[clientSocket, gameName])




  return (
    <Card className="main " sx={{ boxShadow: "none", overflow: "visible" }}>
      <Card className="playerInfo" sx={{ boxShadow: "none" }}>
        <Card
          className="playerScore"
          color="secondary"
          sx={{ boxShadow: "none" }}
        >
          <Typography
            sx={{ fontSize: 50, fontWeight: "bold" }}
            color="secondary"
          >
            {`USERNAME: ${username}`}
          </Typography>
          <Typography
            sx={{ fontSize: 50, fontWeight: "bold" }}
            color="secondary"
          >
            {`gameNAme in XGamePlay: ${gameName}`}
          </Typography>
        </Card>

        
      </Card>

      {/* BUTTONS */}
      <Card className="buttons " sx={{ boxShadow: "none" }}>

 {/* GET WORD BUTTON -  only visible if it is userScore's turn*/}
 {game && userScore && game.turn === userScore.turnNum ? (
          <Button
            // className={!wordX || !wordX.length ? "pulse" : null}
            onClick={() => handleGetWord()}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
              Get Word
            </Typography>
          </Button>
        ) : null}


        {/* WORD */}
        <Typography color={"secondary"} sx={{ fontSize: 30 }}>
             {`Word: ${word}`}
            </Typography>
        <Typography color={"secondary"} sx={{ fontSize: 30 }}>
             {`Owner: ${wordOwner}`}
            </Typography>
        <Typography color={"secondary"} sx={{ fontSize: 30 }}>
             {`Socket: ${wordSocket}`}
            </Typography>
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
            {`Storage: ${wordStorage}`}
            </Typography>
        {/* {game && word && word.length ? (
          
       <Card
       className="playerScore"
       color="secondary"
       sx={{ boxShadow: "none" }}
     >
       <Typography
         sx={{ fontSize: 50, fontWeight: "bold" }}
         color="secondary"
       >
         {}
       </Typography>
     </Card>
        ) : null} */}

        {/* <h3>{typeof definition === "string" ? definition : " "}</h3>
    { typeof definition === "string" ?  <Button onClick={() => play()}>Play</Button> : null} */}

      

      
      
      </Card>
    </Card>
  );
};

export default DBGamePlay;
