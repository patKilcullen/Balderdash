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

import { editScore, addPoint } from "../scores/scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";
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

  const dispatch = useDispatch();
const word = useSelector(selectWord)


// console.log("top IN GUESS DEFS: ", top)

  const singleGame = useSelector(selectSingleGame);
  const tempScoreCardMessages = useSelector(selectTempScoreCardMessages);

  const [countdown, setCountdown] = useState(18);
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

  const testDefinitions =["Lorem ipsum dolor sit amet, consectetur adipiscing elit,", "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut", "enim ad minim veniam", "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute", "irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]
const testWord = "Pattycakes"


  return (
    // <div>
    //   <div>Definitions</div>

    //   {correct === true ? (
    //     <div>Correctamundo!!!</div>
    //   ) : correct === false ? (
    //     <div>Wrong, idiot!</div>
    //   ) : null}

    //   {guessed === false && defList === true && fakeDefs && fakeDefs.length
    //     ? fakeDefs
    //         .filter((def) => !def.hasOwnProperty(`${userId}`))
    //         .map((def) => {
    //           const value = Object.values(def)[0];
    //           return (
    //             <Button
    //               variant="contained"
    //               size="large"
    //               sx={{ border: "2px solid black" }}
    //               onClick={() => handleChooseWord(def)}
    //             >
    //               {value}
    //             </Button>
    //           );
    //         })
    //     : ""}
    // </div>

    <div style={{display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center"}}>
    <div>Definitions</div>

    {/* {correct === true ? (
      <div>Correctamundo!!!</div>
    ) : correct === false ? (
      <div>Wrong, idiot!</div>
    ) : null} */}


{/* {guessed === false && defList === true && testDefinitions && testDefinitions.length
      ? testDefinitions */}
    {guessed === false && defList === true && fakeDefs && fakeDefs.length
      ? fakeDefs
           .filter((def) => !def.hasOwnProperty(`${userId}`))
          .map((def) => {
            const value = Object.values(def)[0];
            return (
            
                <CardFront def={def} handleChooseWord={handleChooseWord} defCards={true} fullScreen={true} top={word} bottom={value} side={"front"} />
            
               
            );
          })
      : ""}
      {guessed ?
      <CardFront side={"back"} fullScreen={true} />
      : null}
  </div>


  );
};

export default GuessDefs;
