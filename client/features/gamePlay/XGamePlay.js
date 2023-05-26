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
  addDefinition
} from "./gamePlaySlice";
import { selectMe } from "../auth/authSlice";
import Timer from "./Timer";

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
  const gameName = game.name;
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [timer, setTimer] = useState(false);

  // const [wordOwner, setWordOwner] = useState("")
  // const [wordSocket, setWordSocket] = useState("")
  // const [wordStorage, setWordStorage] = useState("")

  // Player whose turn it is
  const playerTurn = game.scores.filter((score) => score.turn === true);
  const playerTurnName = playerTurn[0].user.username;

  const fakeWords = useSelector(selectFakeWords);
  console.log("FAKE WORDS: ", fakeWords);

  const fakeDefinitions = useSelector(selectFakeDefinitions);
console.log("FAKE DEFS:", fakeDefinitions)
  // SOCKET
  const clientSocket = useContext(SocketContext);

  const handleGetWord = () => {
    dispatch(getWord()).then((res) => {
      // localStorage.setItem(`${gameName}-word`, res.payload[0]);
      // clientSocket.emit("send_word", { word: res.payload[0], room: gameName });
      // setWordOwner(res.payload[0])
      setWord(res.payload[0]);
      dispatch(getDefinition(res.payload[0])).then((res) => {
        setDefinition(res.payload);
        dispatch(addDefinition({real : res.payload}))
      });
    });
  };




  const handleChooseWord = () => {
    handleGetFakeWords()
    
    clientSocket.emit("send_word", { word: word, room: gameName });
    setTimer(true)
  };

  let allDefs;
  const handleGetFakeWords = () => {
    dispatch(clearFakeWords());
    allDefs = [];
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };






  // Player (and play turn)joins socket room every time the gameName changes
  useEffect(() => {
    userScore || playerTurnName === username
      ? clientSocket.emit("join_room", { room: gameName, userName: username })
      : null;
  }, [gameName]);




  // This useEffect ensures sockets dont render on the wrong game for client who
  // belong(or have visited?) more than one game
  useEffect(() => {
    clientSocket.on("receive_word", ({ word, room }) => {
      room === gameName
        ? //     setWordSocket(`WORDL ${word} Room: ${room} gameName: ${gameName}`)
          //   &&
          setWord(word)
        : //  setWordSocket('')
          setWord("");
    });

    clientSocket.on("receive_start_countdown", (room) => {
      room === gameName ? setTimer(true) : setTimer(false);
    });

    // if players turn, recieve other players fake definitions and add the to fake def arr
    // with key associated with player id so they can later be awarded point
    clientSocket.on(
      "receive_player_fake_def",
      ({ playerDef, room, userId, playerTurnName }) => {
        let playerId = userId
        room === gameName && playerTurnName === username
          ? 
          dispatch(addDefinition({[playerId] : playerDef}))
         
          : null;
      }
    );
  }, [clientSocket, gameName]);



  return (
    <Card className="main " sx={{ boxShadow: "none", overflow: "visible" }}>
      {/* TIMER */}
      

      <Card className="playerInfo" sx={{ boxShadow: "none" }}>
        <Card
          className="playerScore"
          color="secondary"
          sx={{ boxShadow: "none" }}
        >
       
          
        </Card>
      </Card>

      {/* BUTTONS */}
      <Card className="buttons " sx={{ boxShadow: "none" }}>
        {/* GET WORD BUTTON -  only visible if it is userScore's turn*/}
        {game && userScore && game.turn === userScore.turnNum ? (
          <Button
            // className={!wordX || !wordX.length ? "pulse" : null}
            onClick={handleGetWord}
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
        {/* <Typography color={"secondary"} sx={{ fontSize: 30 }}>
             {`Owner: ${wordOwner}`}
            </Typography>
        <Typography color={"secondary"} sx={{ fontSize: 30 }}>
             {`Socket: ${wordSocket}`}
            </Typography>
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
            {`Storage: ${wordStorage}`}
            </Typography> */}

        {/* DEFINITION */}
        <Typography color={"secondary"} sx={{ fontSize: 30 }}>
          {`Definition: ${definition}`}
        </Typography>

        {definition ? (
          <Button
            className={"pulse"}
            onClick={() => handleChooseWord()}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
              Choose Word
            </Typography>
          </Button>
        ) : null}
        {timer ? (
        <Timer
        game={game}
          userId={userId}
          userScore={userScore}
          gameName={gameName}
          gameId={game.id}
          playerTurnName={playerTurnName}
          definition={definition}
        />
      ) : null}
      </Card>
    </Card>
  );
};

export default XGamePlay;
