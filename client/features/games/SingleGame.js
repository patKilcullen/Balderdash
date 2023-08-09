import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// SLICES/STATE REDUCERS, ETC.
import { selectSingleGame, fetchSingleGame, editGame } from "./singleGameSlice";
import {
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

// SOCKET
import { SocketContext } from "../../app/SocketProvider";

// COMPONENTS
import GamePlay from "../gamePlay/GamePlay";
import TempScoreCard from "../scores/TempScoreCard";
import ScoreCard from "../scores/ScoreCard";
import FinalCard from "../scores/FinalCard";
import CardFront from "../cards/CardFront";

// Material UI
import { Card, Button, Typography } from "@mui/material";

const SingleGame = () => {
// COMPONENET STATE
const [showFinalCard, setShowFinalCard] = useState(false);

  // SOCKET
  const clientSocket = useContext(SocketContext);

  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();
  const gameId = id;
  const username = useSelector((state) => state.auth.me.username);
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userScore = scores.find((score) => score.userId === userId);

  // If there are 0 rounds left, render the FinalCard
  useEffect(() => {
    game.roundsLeft === 0 ? setShowFinalCard(true) : setShowFinalCard(false);
  }, [game.roundsLeft]);



  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
  }, [gameId]);

  const [showTempScoreCard, setShowTempScoreCard] = useState(false);
  // Updates scores when game round is over and its new player's turn
  const reloadScores = () => {
    dispatch(fetchAllGameScores(gameId));
    setTimeout(() => {
      dispatch(clearTempScoreCardMessages());
      setShowTempScoreCard(false);
    }, 10000);
    setShowTempScoreCard(true);
  };

  // WHEN ACCEPT HAVE TO EDIT THE GAME AND THE SCORE. get response from game edit to edit score..
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
        clientSocket.emit("send_ask_to_join", {
          room: game.name,
          userName: username,
        });
        dispatch(fetchSingleGame(gameId));
        dispatch(fetchAllGameScores(gameId));
      });
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
    clientSocket.emit("send_ask_to_join", {
      room: game.name,
      userName: username,
    });
  };

  // START GAME
  const handleStartGame = () => {
    dispatch(editGame({ id: game.id, started: true })).then(() => {
      dispatch(fetchSingleGame(gameId));
    });
    // game.name && username ?
    clientSocket.emit("send_start_game", {
      room: game.name,
      userName: username,
    });
    // : null
  };

  const [tempScoreCard, setTempScoreCard] = useState("");
  const tempScoreCardTurn = useSelector(selectTempScoreCardMessages);

  useEffect(() => {
    setTempScoreCard(tempScoreCardTurn);
  }, [tempScoreCardTurn]);

  // SHOULD THIS CHECK IF ITS THE RIGHT GAME?????????
  useEffect(() => {
    clientSocket.on("receive_score_card", ({ tempScoreCardMessages }) => {
      setTempScoreCard(tempScoreCardMessages);
    });

    clientSocket.on("receive_start_game", ({ room, userName }) => {
      console.log("ROOM & GAME>NAME, gameID: ", room, game.name, gameId);
      // room === game.name ? console.log("THE FUCKING SAME") : console.log("NOTOTOTOOTTTHE FUCKING SAME")
      //  room === game.name ? dispatch(fetchSingleGame(gameId)): null;
      dispatch(fetchSingleGame(gameId));
    });
    clientSocket.on("recieve_ask_to_join", (room) => {
      room === game.name ? dispatch(fetchAllGameScores(gameId)) : null;
    });

    clientSocket.on("receive_play_again", ({ room, gameId }) => {
      room === game.name ? dispatch(fetchSingleGame(gameId)) : null;
    });
  }, [clientSocket, game, gameId]);

  // USER LEAVES SOCKET ROOM WHEN SINGLE GAME UNMOUNTS
  useEffect(() => {
    userScore
      ? clientSocket.emit("join_room", { room: game.name, userName: username })
      : null;
    // DO NOT DELETE YET>>> may neeed to disconnect at somepoint, but it curreny causes issues,
    // maybe because it changes everytime game changes?

    // return () => {
    //   // Leave the room
    //   clientSocket.emit("leave_room", { room: game.name });
    //   // Disconnect the socket
    //   // clientSocket.disconnect();
    // };
  }, [game, userScore]);

  const [showTiedGame, setShowTiedGame] = useState(false);
  const checkIfTied = () => {
    setShowTiedGame(true);
  };

  return (
    <Card>
      {showTempScoreCard ? (
        <TempScoreCard
          tempScoreCard={tempScoreCard}
          showTiedGame={showTiedGame}
        />
      ) : null}
      {/* <ScoreCard scoreCard={scoreCard} />  */}

      {/* GAME OVER CARD */}
      {showFinalCard ? <FinalCard game={game} userScore={userScore} /> : null}

      {/* SCOORE CARD */}
      <ScoreCard
        userId={userId}
        userScore={userScore}
        game={game}
        handleAskJoin={handleAskJoin}
        handleStartGame={handleStartGame}
        handleDeclineRequest={handleDeclineRequest}
        handleAcceptRequest={handleAcceptRequest}
      />

      {/* GAME PLAY */}
      {(game.started === true && game.ownerId === userId) ||
      (game.started === true && userScore) ? (
        <>
          <GamePlay
            userId={userId}
            game={game}
            userScore={userScore}
            reloadScores={reloadScores}
            checkIfTied={checkIfTied}
          />
        </>
      ) : null}
      <Button
        type="button"
        color="secondary"
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
        onClick={() => navigate("/home")}
      >
        Home
      </Button>
    </Card>
  );
};

export default SingleGame;
