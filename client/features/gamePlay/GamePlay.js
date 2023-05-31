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
  addDefinition, 

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

const GamePlay = ({ userId, game, userScore, reload }) => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const username = me.username;
  const gameName = game.name;
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [timer, setTimer] = useState(false);
  const [choseWord, setChoseWord] = useState(false)

  // const [wordOwner, setWordOwner] = useState("")
  // const [wordSocket, setWordSocket] = useState("")
  // const [wordStorage, setWordStorage] = useState("")

  // Player whose turn it is
  // PLAYER_TURN_PROBLEM


const [playerTurn, setPlayerTurn] = useState("")
const [playerTurnName, setPlayerTurnName] = useState("")
useEffect(()=>{
game && game.scores ? setPlayerTurn(game.scores.filter((score) => score.turnNum === game.turn)) : null
// const playerTurnX = game.scores.filter((score) => score.turnNum === game.turn);
// setPlayerTurn(playerTurnX)
// let playerTurnNameX = playerTurnX[0].user.username
playerTurn ? 
setPlayerTurnName(playerTurn[0].user.username)
: null

},[game, ])



useEffect(()=>{
  clientSocket.emit("send_player_turn_name", {playerTurnName, gameName})
},[playerTurnName])



// useEffect(()=>{
//   const playerTurnX = game.scores.filter((score) => score.turnNum === game.turn);
//   setPlayerTurn(playerTurnX)
//   // Player turn never changes with one below//
//   // const playerTurn = game.scores.filter((score) => score.turn === true);
//  let playerTurnNameX = playerTurn[0].user.username
// setPlayerTurnName(playerTurnNameX)
// }, [game])



  const fakeWords = useSelector(selectFakeWords);

  const fakeDefinitions = useSelector(selectFakeDefinitions);

  // SOCKET
  const clientSocket = useContext(SocketContext);

  const handleGetWord = () => {
    dispatch(clearFakeDefs())
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
    
    clientSocket.emit("send_word", { word: word, room: gameName, playerTurnName: username });
    setTimer(true)
    setChoseWord(true)
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
    userScore 
    || playerTurnName === username
      ? clientSocket.emit("join_room", { room: gameName, userName: username })
      : null;
      // ADING playTURN BEFORE MAY HAVE SOLVERS PLAYER_TURN_PROBLEM
  }, [gameName, playerTurn]);




  // This useEffect ensures sockets dont render on the wrong game for client who
  // belong(or have visited?) more than one game
  useEffect(() => {
    clientSocket.on("receive_word", ({ word, room, playerTurnName }) => {
playerTurnName !== username ? setPlayerTurnName(playerTurnName) : null
      room === gameName
        ? //     setWordSocket(`WORDL ${word} Room: ${room} gameName: ${gameName}`)
          //   &&
          setWord(word)

        : //  setWordSocket('')
          setWord("");

          room === gameName
    });

    clientSocket.on("receive_start_countdown", (room) => {
      room === gameName ? setTimer(true) : setTimer(false);
    });

    // if players turn, recieve other players fake definitions and add the to fake def arr
    // with key associated with player id so they can later be awarded point
    clientSocket.on(
      "receive_player_fake_def",
      ({ playerDef, room, userId, playerTurnName }) => {

        console.log(`RECEIVER PLAYER FAKE DEFS: ,def  ${playerDef},room: ${room}, userId ${userId}, playerTurnName ${playerTurnName}`)
console.log("usename: ", username)
        let playerId = userId
        room === gameName 
        && playerTurnName === username
          ? 
          dispatch(addDefinition({[playerId] : playerDef}))
         
          : console.log("DIDIDIDIDIID WORKKK");
      }
    );

    clientSocket.on("receive_player_turn_name", ({playerTurnName, room}) => {
      console.log("SOCKKY WORKYY")
      room === gameName ? setPlayerTurnName(playerTurnName) : null;
    });
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

        {definition && !choseWord ? (
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
          reload={reload}
          setDefinition={setDefinition}
          setWord={setWord}
          setTimer={setTimer}
          setChoseWord={setChoseWord}
        />
      ) : null}
      </Card>
    </Card>
  );
};

export default GamePlay;
