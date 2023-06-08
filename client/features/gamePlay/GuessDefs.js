import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  addScoreCardMessage,
  selectScoreCardMessages
} from "./gamePlaySlice";
import { SocketContext } from "../../app/SocketProvider";

import { editScore, addPoint } from "../scores/scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";
import { fetchSingleGame, fetchAllGameScores } from "../games/singleGameSlice";
import { clearFakeWords, clearFakeDefs } from "./gamePlaySlice";
import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import Button from "@mui/material/Button";

import ScoreCard from "../scores/ScoreCard";

const GuessDefs = ({
  game,
  username,
  userId,
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
  // const [scoreCardView, setScoreCardView] = useState(false)
  // const [scoreCard, setScoreCard] = useState("")
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
      let message = `${username} guessed the WRONG answer!`
      // have to check for player turn name because is is null when its the users turn
      !playerTurnName ? dispatch(addScoreCardMessage(message)) : null;
       clientSocket.emit("send_score_card_info", {gameName: gameName,playerTurnName: playerTurnName ? playerTurnName : username, message: message})

      null;
    }
    if (userKey === "real") {
   let message = `${username} guessed the CORRECT answer and gets 1 point!`
      dispatch(addPoint({ userId: userId, gameId: gameId }));
      !playerTurnName ? dispatch(addScoreCardMessage(message)) : null;
       clientSocket.emit("send_score_card_info", {gameName: gameName, playerTurnName: playerTurnName ? playerTurnName : username, message: message})
    }

    if (userKey !== "fake" && userKey !== "real") {
      dispatch(addPoint({ userId: userKey, gameId: gameId })).then((res)=>{
let message =  `${username} guessed ${res.payload.user.username}'s fake definition... ${res.payload.user.username} gets 1 point!!`
!playerTurnName ? dispatch(addScoreCardMessage(message)) : null;
clientSocket.emit("send_score_card_info", {gameName: gameName, playerTurnName: playerTurnName ? playerTurnName : username, message:message})

      })
     


      
    }
  };

  useEffect(() => {
    clientSocket.emit("send_fake_defs", { fakeDefinitions, gameName });
  }, [fakeDefinitions]);

  clientSocket.on("receive_fake_defs", (fakeDefinitions) => {
    setFakeDefs(fakeDefinitions);
  });



useEffect(()=>{
  clientSocket.on(
    "receive_score_card_info",
    ({room,playerTurnName, message}) => {
     console.log("playerTurnName: ", playerTurnName)
     console.log("USERNAME: ", username)
     console.log("MESSAGE: ", message)

     room === gameName &&
      playerTurnName === username
      
        ? 
        // console.log("FAGGOOTTT YOU THE USER")
       dispatch(addScoreCardMessage(message))
        : console.log("ERROR: if AINT YOUR TURNNNN");



      // dispatch(addScoreCardMessage(message))
    }
  );


  clientSocket.on('receive_score_card', ({gameName, scoreCardMessages})=>{
    setScoreCard(scoreCardMessages)
    // console.log("THESE SCORE CARD MESSAGESSS: ", scoreCardMessages)
  })



  }, [clientSocket])

  // clientSocket.on(
  //   "receive_player_fake_def",
  //   ({ playerDef, room, userId, playerTurnName }) => {
  //     let playerId = userId;
  //     room === gameName && playerTurnName === username
  //       ? dispatch(addDefinition({ [playerId]: playerDef }))
  //       : console.log("ERROR: Failed to add player definition");
  //   }
  // );



  const scoreCardMessages = useSelector(selectScoreCardMessages)



useEffect(() => {
// setScoreCard(scoreCardMessages)
  clientSocket.emit("send_score_card", { scoreCardMessages, gameName });
}, [scoreCardMessages]);


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

       
        {/* <div>
        <ScoreCard scoreCard={scoreCard}/> 
        <div style={{heigh: "500px", width: "500px", border: "10px solid red", position: "absolute"}}>GATY ASSS</div>
        </div>
        */}
        </div>
  
  );
};

export default GuessDefs;
