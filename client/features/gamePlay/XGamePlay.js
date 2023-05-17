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

const XGamePlay = ({ userId, game, userScore }) => {
  const dispatch = useDispatch();

  const me = useSelector(selectMe);
  const username = me.username;

  // SOCKET

  const clientSocket = useContext(SocketContext);

  // Right now, it gets the word and puts it in state,
  const handleGetWord = () => {
    dispatch(getWord()).then((res) => {});
  };

  useEffect(() => {
    //   const wordFromStorage  = localStorage.getItem(`${game.id}-word`)
    //   dispatch(addWordPlayerNotTurn(wordFromStorage))
    //   setThisWord(wordFromStorage)
    // userScore ?
    // clientSocket.emit("join_room", game.id)
    // :null
  }, []);

  // SOCKET - Receive info from client socket
  useEffect(() => {
    clientSocket.on("receive_word", ({ word, room }) => {});
  }, [clientSocket]);

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
            {username}
          </Typography>
        </Card>

        <Card
          className="playerScore"
          color="secondary"
          sx={{ boxShadow: "none" }}
        ></Card>
      </Card>

      {/* BUTTONS */}
      <Card className="buttons " sx={{ boxShadow: "none" }}>

        {/* WORD */}
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

export default XGamePlay;
