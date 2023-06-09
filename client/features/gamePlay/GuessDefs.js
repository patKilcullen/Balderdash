import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  addScoreCardMessage,
  selectScoreCardMessages,
} from "./gamePlaySlice";
import { SocketContext } from "../../app/SocketProvider";

import { editScore, addPoint } from "../scores/scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";
import {
  fetchSingleGame,
  fetchAllGameScores,
  selectSingleGame,
} from "../games/singleGameSlice";
import { clearFakeWords, clearFakeDefs } from "./gamePlaySlice";
import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import Button from "@mui/material/Button";

import ScoreCard from "../scores/ScoreCard";

const GuessDefs = ({
  game,
  username,
  userId,
  userScore,
  fakeDefinitions,
  gameName,
  gameId,

  playerTurnName,
  reloadScores,
  setDefinition,
  setWord,
  setTimer,
  setPlayGame,
  setChoseWord,
}) => {
  const clientSocket = useContext(SocketContext);

  const [fakeDefs, setFakeDefs] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [defList, setDefList] = useState(null);
  const [guessed, setGuessed] = useState(false);

  const dispatch = useDispatch();

  const singleGame = useSelector(selectSingleGame);
  const scoreCardMessages = useSelector(selectScoreCardMessages);

  const [countdown, setCountdown] = useState(7);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (countdown > 0) {
        setDefList(true);
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        setDefList(false);

        handleChangeGameTurn();

        reloadScores();

        setDefinition("");
        setWord("");

        setGuessed(false);
        setDefList(null);
        setFakeDefs([]);
        setTimer(false);
        setPlayGame(false);
        setChoseWord(false);
        dispatch(clearFakeWords());
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    // NEEDED?
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChangeGameTurn = () => {
    game.turn === 1
      ? dispatch(editGameTurn({ gameId: gameId, turn: game.numPlayers }))
      : dispatch(editGameTurn({ gameId: gameId, turn: game.turn - 1 }));
  };

  useEffect(() => {
    setFakeDefs(fakeDefinitions);
  }, [fakeDefinitions]);

  // CHOOSE WORD
  const handleChooseWord = (def) => {
    setGuessed(true);

    const userKey = Object.keys(def)[0];

    if (userKey === "fake") {
      let message = `${username} guessed the WRONG answer!`;

      //If its users turn, add message to state, otherwise send it through socket to
      //  player whos turn it is so they can put it in state (SAME FOR FAKE AND !FALE && !REAL)
      singleGame.turn === userScore.turnNum
        ? dispatch(addScoreCardMessage(message))
        : clientSocket.emit("send_score_card_info", {
            gameName: gameName,
            playerTurnName: playerTurnName,
            message: message,
          });
      null;
    }
    if (userKey === "real") {
      let message = `${username} guessed the CORRECT answer and gets 1 point!`;
      dispatch(addPoint({ userId: userId, gameId: gameId }));
      singleGame.turn === userScore.turnNum
        ? dispatch(addScoreCardMessage(message))
        : clientSocket.emit("send_score_card_info", {
            gameName: gameName,
            playerTurnName: playerTurnName,
            message: message,
          });
    }

    if (userKey !== "fake" && userKey !== "real") {
      dispatch(addPoint({ userId: userKey, gameId: gameId })).then((res) => {
        let message = `${username} guessed ${res.payload.user.username}'s fake definition... ${res.payload.user.username} gets 1 point!!`;

        singleGame.turn === userScore.turnNum
          ? dispatch(addScoreCardMessage(message))
          : clientSocket.emit("send_score_card_info", {
              gameName: gameName,
              playerTurnName: playerTurnName,
              message: message,
            });
      });
    }
  };

  useEffect(() => {
    clientSocket.emit("send_fake_defs", { fakeDefinitions, gameName });
  }, [fakeDefinitions]);

  clientSocket.on("receive_fake_defs", (fakeDefinitions) => {
    setFakeDefs(fakeDefinitions);
  });

  useEffect(() => {
    clientSocket.on("receive_score_card_info", ({ room, message }) => {
      room === gameName && singleGame.turn === userScore.turnNum
        ? dispatch(addScoreCardMessage(message))
        : null;
    });
  }, [clientSocket]);

  useEffect(() => {
    clientSocket.emit("send_score_card", { scoreCardMessages, gameName });
  }, [scoreCardMessages]);

  return (
    <div>
      <div>Definitions</div>

      {correct === true ? (
        <div>Correctamundo!!!</div>
      ) : correct === false ? (
        <div>Wrong, idiot!</div>
      ) : null}

      {guessed === false && defList === true && fakeDefs && fakeDefs.length
        ? fakeDefs
            .filter((def) => !def.hasOwnProperty(`${userId}`))
            .map((def) => {
              const value = Object.values(def)[0];
              return (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ border: "2px solid black" }}
                  onClick={() => handleChooseWord(def)}
                >
                  {value}
                </Button>
              );
            })
        : ""}

      {/* <div>
        <ScoreCard scoreCard={scoreCard}/> 
        <div style={{heigh: "500px", width: "500px", border: "10px solid red", position: "absolute"}}>GATY ASSS</div>
        </div>
        */}
    </div>
  );
};

export default GuessDefs;
