import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";


import { selectSingleGame, fetchSingleGame, editGame } from "./singleGameSlice";
import {
  fetchAllScores,
  selectAllScores,
  fetchAllGameScores,
  editScore,
  deleteScore,
  createScore,
} from "../scores/scoresSlice";

import {
  selectTempScoreCardMessages,
  clearTempScoreCardMessages,
} from "../gamePlay/gamePlaySlice";

import Main from "../main/Main";
// import GamePlay from "../gamePlay/GamePlayOLD";
import GamePlay from "../gamePlay/GamePlay";
// SOCKET
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";
import { use } from "chai";

import TempScoreCard from "../scores/TempScoreCard";
import ScoreCard from "../scores/ScoreCard";
// Material UI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SingleGame = () => {
  // put user ID in props????

  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();
  const gameId = id;
  const username = useSelector((state) => state.auth.me.username);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);

  const userScore = scores.find((score) => score.userId === userId);


console.log("GAME: ", game.name)

  // Could use res of fetchSingleGame to get scores through eager loading and set them
  // to state instead of fetchAllGameScores and score = useSelector(selectAllScores)
  // not such which would be more efficent or if it makes a diference
  const [scoresX, setScoresX] = useState("");
  useEffect(() => {
    dispatch(fetchSingleGame(gameId)).then((res) => {
      setScoresX(res.payload.scores);
    });
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, []);
  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, [gameId]);

  const [showTempScoreCard, setShowTempScoreCard] = useState(false);
  // Updates scores when
  const reloadScores = () => {
    dispatch(fetchAllGameScores(gameId));
    setTimeout(() => {
      dispatch(clearTempScoreCardMessages());

      setShowTempScoreCard(false);
    }, 5000);
    setShowTempScoreCard(true);
  };

  // SOCKET
  //  const clientSocket = socket.connect("http://localhost:8080");
  const clientSocket = useContext(SocketContext);

  // WHEN ACCEPT HAVE TO EDIT THE GAME AND THE SCORE>>>> coudl get response from game edit to edit score..
  const handleAcceptRequest = (id) => {
    dispatch(editGame({ id: game.id, numPlayers: game.numPlayers + 1 }))
      .then((res) => {
        
        dispatch(
          editScore({
            userId: id,
            turnNum: res.payload.numPlayers,
            gameId: game.id,
            accepted: true,
          })
        );
      })
      .then(() => {
        dispatch(fetchSingleGame(gameId));
        dispatch(fetchAllGameScores(gameId));
      })
     

  };
  // DECLINE REQUEST TO PLAY
  const handleDeclineRequest = (id) => {
    dispatch(deleteScore({ userId: id, gameId: game.id }));
    dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
  };

  //  ASK TO JOIN GAME
  const handleAskJoin = () => {
    dispatch(
      createScore({
        score: 0,
        accepted: false,
        turn: false,
        turnNum: null,
        gameId: gameId,
        userId: userId,
      })
    );
    clientSocket.emit("send_ask_to_join", { room: game.name, userName: username })
  };



  // START GAME
  const handleStartGame = () => {
    dispatch(editGame({ id: game.id, started: true })).then(() => {
      dispatch(fetchSingleGame(gameId));
    });
// game.name && username ? 
   clientSocket.emit("send_start_game", { room: game.name, userName: username })
// : null
  };

  const [tempScoreCard, setTempScoreCard] = useState("");
  const tempScoreCardTurn = useSelector(selectTempScoreCardMessages);

  useEffect(() => {
    setTempScoreCard(tempScoreCardTurn);
  }, [tempScoreCardTurn]);



  // SHOULD THIS CHECK IF ITS THE RIGHT GAME?????????
  useEffect(() => {
    clientSocket.on(
      "receive_score_card",
      ({ gameName, tempScoreCardMessages }) => {
        //  setScoreCard(scoreCardMessages)

        setTempScoreCard(tempScoreCardMessages);
      }
    );

    clientSocket.on(
      "receive_start_game",
      ({ room, userName }) => {
 
        dispatch(fetchSingleGame(gameId))
  
      }
    );
    clientSocket.on("recieve_ask_to_join", (room) => {

      console.log("HERE DUDE: ", room, game.name)
     room === game.name ?
      dispatch(fetchAllGameScores(gameId))
      : null
    });


  }, [clientSocket, game]);

 
  // USER LEAVES SOCKET ROOM WHEN SINGLe GAME UNMOUNTS
  useEffect(() => {
    userScore
      ? clientSocket.emit("join_room", { room: game.name, userName: username })
      : null;
    return () => {
      // Leave the room
      clientSocket.emit("leave_room", { room: game.name });
      // Disconnect the socket
      // clientSocket.disconnect();
    };
  }, [game]);




  
  


  return (
    <Card >
      {/* SHOWSCORE CARD MAY BE UNECESSARY */}
      {showTempScoreCard ? (
        <TempScoreCard tempScoreCard={tempScoreCard} />
      ) : null}
      {/* <ScoreCard scoreCard={scoreCard} />  */}


      <ScoreCard userId={userId} userScore={userScore} game={game} handleAskJoin={handleAskJoin} handleStartGame={handleStartGame}
      handleDeclineRequest={handleDeclineRequest} handleAcceptRequest={handleAcceptRequest}  /> 




      {/* GAME PLAY */}
      {(game.started === true && game.ownerId === userId) ||
      (game.started === true && userScore) ? (
        <>
          {/* <GamePlay userId={userId} game={game} userScore={userScore} /> */}
          <GamePlay
            userId={userId}
            game={game}
            userScore={userScore}
            reloadScores={reloadScores}
          />
        </>
      ) : null}
      <Button type="button" color='secondary' sx={{textDecoration: "underline", fontWeight: "bold"}} onClick={()=> navigate('/home')}>Home</Button>
    </Card>
  );
};

export default SingleGame;
