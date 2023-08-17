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
  selectWord,
  selectDefinition
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
  const [tempScoreCard, setTempScoreCard] = useState("");
  const [showTempScoreCard, setShowTempScoreCard] = useState(false);
  const [showTiedGame, setShowTiedGame] = useState(false);
    const [reloadFlip, setReloadFlip] = useState(false);
  // SOCKET
  const clientSocket = useContext(SocketContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const gameId = id;
  const userId = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);
  const tempScoreCardTurn = useSelector(selectTempScoreCardMessages);
  const userScore = scores.find((score) => score.userId === userId);


const word = useSelector(selectWord)
const defintion = useSelector(selectDefinition)
console.log("WORD AND Def IN SINGLE GAME: ", word, defintion)

  // If there are 0 rounds left, render the FinalCard
  useEffect(() => {
    game.roundsLeft === 0 ? setShowFinalCard(true) : setShowFinalCard(false);
  }, [game.roundsLeft]);

  // FETCHES GAME AND ASOCIATED SCORES when gameId Changes
  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
  }, [gameId]);



  // SHOWS TEMPSCORECARD AND RELOADS/UPDATES SCORES  and reloads the cardFlip animation when game round is over and its new player's turn the
  const reloadScores = () => {
    dispatch(fetchAllGameScores(gameId));
    setTimeout(() => {
      dispatch(clearTempScoreCardMessages());
      setShowTempScoreCard(false);
setReloadFlip(true)
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
    clientSocket.emit("send_start_game", {
      room: game.name,
      userName: username,
    });
  };

  // SETS TEMPSCORECARD (card that shows info about the round/points earned) when scorecardturnChanges
  useEffect(() => {
    setTempScoreCard(tempScoreCardTurn);
  }, [tempScoreCardTurn]);

  // SOCKET RECIEVE
  useEffect(() => {
    clientSocket.on("receive_score_card", ({ tempScoreCardMessages }) => {
      setTempScoreCard(tempScoreCardMessages);
    });

    clientSocket.on("receive_start_game", ({ room, userName }) => {
      dispatch(fetchSingleGame(gameId));
    });
    clientSocket.on("recieve_ask_to_join", (room) => {
      room === game.name ? dispatch(fetchAllGameScores(gameId)) : null;
    });

    clientSocket.on("receive_play_again", ({ room, gameId }) => {
      room === game.name ? dispatch(fetchSingleGame(gameId)) : null;
    });
  }, [clientSocket, game, gameId]);

  // SOCKET EMIT
  // play joins rrom when game or userScore changes
  useEffect(() => {
    userScore
      ? clientSocket.emit("join_room", { room: game.name, userName: username })
      : null;
  }, [game, userScore]);

  // TIED GAME, if game is tied, render it on tempscorecard and do not end game
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
            setReloadFlip={setReloadFlip}
            reloadFlip={reloadFlip}
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
