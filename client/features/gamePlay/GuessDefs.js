import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  addTempScoreCardMessage,
  selectTempScoreCardMessages,
} from "./gamePlaySlice";
import { SocketContext } from "../../app/SocketProvider";

import {
  editScore,
  addPoint,
  fetchHighestGameScores,
} from "../scores/scoresSlice";
import { editGame, editGameTurn } from "../games/singleGameSlice";
import {
  fetchSingleGame,
  fetchAllGameScores,
  selectSingleGame,
} from "../games/singleGameSlice";
import { clearFakeWords, clearFakeDefs, selectWord } from "./gamePlaySlice";
import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import Button from "@mui/material/Button";

import TempScoreCard from "../scores/TempScoreCard";
import CardFront from "../cards/CardFront";

const GuessDefs = ({
  checkIfTied,
  showBackOfCard,
  makeHidden,
  top,
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
  const [isTied, setIsTied] = useState(false)

  const dispatch = useDispatch();
  const word = useSelector(selectWord);

  const singleGame = useSelector(selectSingleGame);
  const tempScoreCardMessages = useSelector(selectTempScoreCardMessages);

  const [countdown, setCountdown] = useState(10);
  useEffect(() => {
    showBackOfCard("front");
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (countdown > 0) {
        setDefList(true);
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        setDefList(false);
        handleChangeGameTurn()
        reloadScores(isTied);
        setDefinition("");
        setWord("");
        setGuessed(false);
        setDefList(null);
        setFakeDefs([]);
        setTimer(false);
        setPlayGame(false);
        setChoseWord(false);
        dispatch(clearFakeWords());
        makeHidden();
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    // NEED?
    return () => clearTimeout(timer);
  }, [countdown]);

  // if more than one round left, change game turn, if 1, set turn to num of players and subtract round, if not 1, -1 from turn and rounds
  // if Last round, check to see if the is one high score, if not, its a tie game, if there is one score, subtract round to 0, thus ending the game
  // if tie game, change turn but dont subtract rounds, it will continue until one high score.
  const handleChangeGameTurn = () => {
    game.roundsLeft !== 1
      ? game.turn === 1
        ? dispatch(
            editGameTurn({
              gameId: gameId,
              turn: game.numPlayers,
              roundsLeft: game.roundsLeft - 1,
            })
          )
        : dispatch(
            editGameTurn({
              gameId: gameId,
              turn: game.turn - 1,
              roundsLeft: game.roundsLeft - 1,
            })
          )
      : dispatch(fetchHighestGameScores(gameId)).then((res) => {
        res.payload.length > 1 ?
        checkIfTied()
        : null

          res.payload.length > 1
            ? 
            game.turn === 1
              ? dispatch(
                  editGameTurn({ gameId: gameId, turn: game.numPlayers })
                )
              : dispatch(editGameTurn({ gameId: gameId, turn: game.turn - 1 }))
            : dispatch(
                editGameTurn({
                  gameId: gameId,
                  turn: game.turn - 1,
                  roundsLeft: game.roundsLeft - 1,
                })
              );
        });
   
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
        ? dispatch(addTempScoreCardMessage(message))
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
        ? dispatch(addTempScoreCardMessage(message))
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
          ? dispatch(addTempScoreCardMessage(message))
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
        ? dispatch(addTempScoreCardMessage(message))
        : null;
    });
  }, [clientSocket]);

  useEffect(() => {
    clientSocket.emit("send_score_card", { tempScoreCardMessages, gameName });
  }, [tempScoreCardMessages]);

  return (
    <div>
      <div style={{ position: "fixed", top: "0", color: "red" }}>
        Time: {countdown}
      </div>
      {guessed === false && defList === true && fakeDefs && fakeDefs.length
        ? fakeDefs
            .filter((def) => !def.hasOwnProperty(`${userId}`))
            .map((def) => {
              const value = Object.values(def)[0];
              return (
                <CardFront
                  def={def}
                  handleChooseWord={handleChooseWord}
                  defCards={true}
                  fullScreen={true}
                  top={word}
                  bottom={value}
                  side={"front"}
                  userScore={userScore}
                  singleGame={singleGame}
                />
              );
            })
        : ""}
      {guessed ? <CardFront side={"back"} fullScreen={true} /> : null}
    </div>
  );
};

export default GuessDefs;
