import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
} from "./gamePlaySlice";
import { SocketContext } from "../../app/SocketProvider";

import { editScore, addPoint } from "../scores/scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";
import { fetchSingleGame, fetchAllGameScores } from "../games/singleGameSlice";
import { clearFakeWords, clearFakeDefs } from "./gamePlaySlice";
import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import Button from "@mui/material/Button";

const GuessDefs = ({
  game,
  username,
  userId,
  fakeDefinitions,
  gameName,
  gameId,
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
  // const [incorrect, setIncorrect] = useState(false)
  // const fakeDefinitions = useSelector(selectFakeDefinitions)

  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState(15);
  useEffect( () => {
    const timer = setTimeout(async () => {
      if (countdown > 0) {
        setDefList(true);
        setCountdown(countdown - 1); // Decrease countdown value
      } else if (countdown === 0) {
        // handleGetFakeDefinitions()

        setDefList(false);
   
     handleChangeGameTurn()

           reloadScores();
       
      
          // location.reload()
     

        // window.reload()
        
        setDefinition("");
        setWord("");

        setGuessed(false);
        setDefList(null);
        setFakeDefs([]);
        setTimer(false);
        setPlayGame(false);
        setChoseWord(false)
        dispatch(clearFakeWords());

        
        // dispatch(fetchSingleGame(gameId));
        // // dispatch(fetchAllScores())
        // dispatch(fetchAllGameScores(gameId))
 
      } else {
        // setDefList(false)
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
       clientSocket.emit("send_score_card_info", {gameId: gameId, message: `${username} guessed the WRONG answer!`})
      console.log("FAKE")
      null;
    }
    if (userKey === "real") {
      console.log("REAL")
      dispatch(addPoint({ userId: userId, gameId: gameId }));

       clientSocket.emit("send_score_card_info", {gameId: gameId, message: `${username} guessed the CORRECT answer and gets 1 point!`})
    }
    if (userKey !== "fake" && userKey !== "real") {
      dispatch(addPoint({ userId: userKey, gameId: gameId })).then((res)=>{
console.log("ADD POINBT RESPONSE: ", res.payload.user.username)
clientSocket.emit("send_score_card_info", {gameId: gameId, message: `${username} guessed ${res.payload.user.username}'s fake definition... ${res.payload.user.username} gets 1 point!!`})
      })
      console.log(`REAL: userId: ${userKey}, gameId: ${gameId}`);


      
    }
  };

  useEffect(() => {
    clientSocket.emit("send_fake_defs", { fakeDefinitions, gameName });
  }, [fakeDefinitions]);

  clientSocket.on("receive_fake_defs", (fakeDefinitions) => {
    setFakeDefs(fakeDefinitions);
  });

  return (
    <div >
      <div >Definitions</div>

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
        </div>
  
  );
};

export default GuessDefs;
