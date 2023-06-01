import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getWord,
  getDefinition,
  getFakeWords,
  clearFakeDefs,
  clearFakeWords,
  addDefinition,
} from "./gamePlaySlice";
import { selectMe } from "../auth/authSlice";
import Timer from "./Timer";

// SOCKET
import { SocketContext } from "../../app/SocketProvider";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const GamePlay = ({ userId, game, userScore, reloadScores }) => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const username = me.username;
  const gameName = game.name;

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [timer, setTimer] = useState(false);
  const [choseWord, setChoseWord] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("");
  const [playerTurnName, setPlayerTurnName] = useState("");

  // SOCKET
  const clientSocket = useContext(SocketContext);

  // Finds the player who turnNum === game.turn, sets it to playerTurnName
  // when the game reloads to check for new turn
  useEffect(() => {
    game && game.scores
      ? setPlayerTurn(
          game.scores.filter((score) => score.turnNum === game.turn)
        )
      : null;
    playerTurn ? setPlayerTurnName(playerTurn[0].user.username) : null;
    // Thought game needed to be in dep array, but seems to be working without
  }, []);

  // GET WORD  first clears defs from last round then gets word from API, sets it in state, then gets the definition throug API
  // then set that in state for player whose turn it is, and then add it the the definition array with the key "real" to distinguish it from othere
  const handleGetWord = () => {
    dispatch(clearFakeDefs());
    dispatch(getWord()).then((res) => {
      setWord(res.payload[0]);
      dispatch(getDefinition(res.payload[0])).then((res) => {
        setDefinition(res.payload);
        dispatch(addDefinition({ real: res.payload }));
      });
    });
  };

  // CHOOSE WORD first gets fake words for fake definition, then emits the word, socket room name (as gamename), and playerTurn(as their username)
  // to other users/ then starts Timer component by setting state to true and then choseWord to true to hide button/keep user from choosing again
  const handleChooseWord = () => {
    handleGetFakeWords();
    clientSocket.emit("send_word", {
      word: word,
      room: gameName,
      playerTurnName: username,
    });
    setTimer(true);
    setChoseWord(true);
  };

  // GET FAKE WORDS   called in handleChooseWord function, clears fake words from last roung, then gets 5 fake words
  const handleGetFakeWords = () => {
    dispatch(clearFakeWords());
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };

  // Player(w/userScore) and plaery who's turn it is joins socket room every time the gameName or playerTurn changes
  useEffect(() => {
    userScore || playerTurnName === username
      ? clientSocket.emit("join_room", { room: gameName, userName: username })
      : null;
    // ADDING playTURN BEFORE MAY HAVE SOLVERS PLAYER_TURN_PROBLEM... needs testinging
  }, [gameName, playerTurn]);

  // This useEffect dependency array ensures sockets dont render on the wrong game for client who
  // belong to(or have visited) other games
  useEffect(() => {
    // RECEIVE WORD from socket first, if it isn't players turn, update playerTurnNAme,
    // then, if they're in the right room, add the word to state
    clientSocket.on("receive_word", ({ word, room, playerTurnName }) => {
      playerTurnName !== username ? setPlayerTurnName(playerTurnName) : null;
      room === gameName
        ? setWord(word)
        : // could this be null? I belive it served a purpose as is but cant recreate it
          setWord("");
    });

    // RECEIVE START COUNTDOWN players receive this from player turn when thet start Timer countdown
    // and automatically start Timer contdown on their end
    clientSocket.on("receive_start_countdown", (room) => {
      room === gameName ? setTimer(true) : setTimer(false);
    });

    // RECEIVER PLAYERS FAKE DEFINITIONS if players turn, recieve other players fake definitions and add the to fake def array
    // with key associated with player id so they can later be awarded point
    clientSocket.on(
      "receive_player_fake_def",
      ({ playerDef, room, userId, playerTurnName }) => {
        let playerId = userId;
        room === gameName && playerTurnName === username
          ? dispatch(addDefinition({ [playerId]: playerDef }))
          : console.log("ERROR: Failed to add player definition");
      }
    );
  }, [clientSocket, gameName]);

  return (
    <Card className="main " sx={{ boxShadow: "none", overflow: "visible", height: "100vh"}}>
      <Card className="buttons " sx={{ boxShadow: "none" }}>

        {/* GET WORD BUTTON -  only visible if it is players turn*/}
        {game && userScore && game.turn === userScore.turnNum ? (
          <Button
       
            onClick={handleGetWord}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography  className={!word|| !word.length ? "pulse" : null} color={"secondary"} sx={{ fontSize: 30 }}>
              Get Word
            </Typography>
          </Button>
        ) : null}

        {/* WORD */}
        <Typography
        className={(!word || !word.length)  && game && userScore && game.turn !== userScore.turnNum ? "pulse" : null} color={"secondary"} sx={{ fontSize: 30 }}>
          Word: 
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
       {` ${word}`}
    </span>
        </Typography>

        {/* DEFINITION */}
       {game && userScore && game.turn === userScore.turnNum ? <Typography color={"secondary"} sx={{ fontSize: 30 }}>
          Definition: 
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
       {` ${definition}`}
    </span>
        </Typography>: null}


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
            reloadScores={reloadScores}
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
