import React, { useEffect, useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocketContext } from "../../app/SocketProvider";

import { clearTempScoreCardMessages, selectPlayerFakeDef} from "../gamePlay/gamePlaySlice";
import { selectMe } from "../auth/authSlice";
import { askAI } from "../gamePlay/openAISlice";
import { add3Points, subtract3Points } from "./scoresSlice";
import { addTempScoreCardMessage } from "../gamePlay/gamePlaySlice";

import {Card, Box, Typography, Button} from "@mui/material"

const TempScoreCard = ({
  game,
  gameName,
  setShowTempScoreCard,
  setReloadFlip,
  word,
  definition,
  tempScoreCard,
  showTiedGame,
}) => {
  const [countdown, setCountdown] = useState(15);
  const dispatch = useDispatch();
  const clientSocket = useContext(SocketContext);

// NEW
const me = useSelector(selectMe);
const userName = me.username;
const userId = me.id
const gameId = game.id
const playerFakeDef = useSelector(selectPlayerFakeDef);
const [aiResponse, setAiResponse] = useState("")


  const [pause, setPause] = useState(false);
  const handleTogglePause = () => {
    setPause(!pause);
    // NEW
    setChallenge({ userName, playerFakeDef });
    clientSocket.emit("send_pause_tempScoreCard_countdown", {
      gameName,
      userName,
      playerFakeDef: playerFakeDef,
    });

    dispatch(askAI({ word, definition: playerFakeDef })).then((res)=>{

clientSocket.emit("send_ask_ai_answer", {
  room: gameName,
  answer: res.payload,
});
// showChallengeAnswer(res.payload)
setTimeout(()=>{

setAiResponse(res.payload);
  setTimeout(()=>{
setPause(pause=> !pause);

  },3000)

}, 3000)




res.payload === "Yes"
  ? dispatch(add3Points({ userId: userId, gameId: gameId })) &&
    // singleGame.turn === userScore.turnNum
    //   ? dispatch(addTempScoreCardMessage(`AI says ${username} wrote a correct definition, ${username} gets 3 points!`))
    //   :
    dispatch(
      addTempScoreCardMessage(
        `AI says ${userName} wrote a correct definition, ${userName} gets 3 points!`
      )
    ) &&
    clientSocket.emit("send_score_card_info", {
      gameName: gameName,
      // playerTurnName: playerTurnName,
      message: `AI says ${userName} wrote a correct definition, ${userName} gets 3 points!`,
    })
  : dispatch(subtract3Points({ userId: userId, gameId: gameId })) &&
    // singleGame.turn === userScore.turnNum
    //   ? dispatch(addTempScoreCardMessage(`AI says ${username} wrote an incorrect definition, ${username} LOSES 3 points!`))
    //   :
    dispatch(
      addTempScoreCardMessage(
        `AI says ${userName} wrote an incorrect definition, ${userName} LOSES 3 points!`
      )
    ) &&
        clientSocket.emit("send_score_card_info", {
            gameName: gameName,
            // playerTurnName: playerTurnName,
            message: `AI says ${userName} wrote an incorrect definition, ${userName} LOSES 3 points!`,
          });



    })
  };

const showChallengeAnswer =(answer)=>{
  console.log("SHOW CAHLLEN ANS: ", answer )
setTimeout(() => {
  console.log("first")
  setAiResponse(answer);
  // setTimeout(() => {
  //   console.log("second: ", pause);
  //   setPause(!pause);
  //   console.log("3: ", pause);
  // }, 5000);

  // console.log("RESPONSE: ", res.payload)
}, 5000);
}
 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0 && !pause) {
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        dispatch(clearTempScoreCardMessages());
        setShowTempScoreCard(false);
        // if game isn;t over, reload flip....
    game.roundsLeft !== 0    ?  setReloadFlip(true) : null
      } else {
        null;
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    // NEED?
    return () => clearTimeout(timer);
  }, [countdown, pause]);

  const [challenge, setChallenge] = useState({})
  // SOCKET RECIEVE
  useEffect(() => {
    clientSocket.on(
      "recieve_pause_tempScoreCard_countdown",
      ({ room, userName, playerFakeDef }) => {
        room === gameName ? setPause(!pause) : null;
         room === gameName ? setChallenge({ userName, playerFakeDef }) : null;
          
      }
    );

     clientSocket.on("receive_ask_ai_answer", ({ room, answer }) => {

room === gameName ? showChallengeAnswer(answer) : null

//        room === gameName ? setAiResponse(answer) : null;
      room === gameName
        ? setTimeout(() => {
            setAiResponse(answer);
            setTimeout(() => {
              setPause(!pause);
            }, 3000);
          }, 3000)
        : null;

     });

  }, [clientSocket, gameName, pause]);

  return (
    <div id="temp-scorecard">
      {!pause ? (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#88ebe6",
            padding: "1em 1em",
            borderRadius: "50px",
            border: "5px solid black",
            boxShadow: "20",
            fontWeight: "bold",

            // FULL SCREEN DIMENSIONS
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",

            transformStyle: "preserve-3d",
            transition: "0.6s",
            transformOrigin: "center center",
          }}
        >
          <Card
            sx={{
              padding: "10px",
              backgroundColor: "#e6e8dc",
              height: "95%",
              width: "90%",
              borderRadius: "50px",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              border: "2px solid black",
            }}
          >
            <Box
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                borderTop: "40px",
                marginTop: "-10px",
                paddingTop: "10px",
                backgroundColor: "#88ebe6",
                width: "110%",
                marginBottom: "10px",
                paddingBottom: "10px",
                height: "20%",
                display: "flex",
                justifyContent: "center",
                borderBottom: "5px solid #571122",
              }}
            >
              <Typography
                style={{
                  fontSize: "40px",
                  fontWeight: "bolder",
                  textShadow: `3px 3px #558ABB`,
                  alignSelf: " center",
                  textDecoration: "underline",
                }}
                color={"secondary"}
              >
                Round Results
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  fontSize: "20px",

                  alignSelf: " center",
                }}
                color={"secondary"}
              >
                The definition of {word} is...
                {definition}
              </Typography>
              <div className="temp-scorecard-messages">
                <h1>Round Results</h1>
                {/* MAP THROUGH TEMPSCORECARD MESSAGE (about who earned points) */}
                {tempScoreCard && tempScoreCard.length
                  ? tempScoreCard.map((message) => {
                      return (
                        <div>
                          <div>{message}</div>
                          <div className="line-break"></div>
                        </div>
                      );
                    })
                  : null}{" "}
              </div>
              <h1 style={{ color: "red" }}>
                {showTiedGame ? "TIED GAME... keep playing!" : null}
              </h1>
            </Box>
          <Button
              sx={{ alignSelf: "center" }}
              variant="contained"
              size="large"
              onClick={handleTogglePause}
            >
              {" "}
              Challenge
            </Button>
            
          </Card>
        </Card>
      ) : (
        // CHALLENGE CARD
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#88ebe6",
            padding: "1em 1em",
            borderRadius: "50px",
            border: "5px solid black",
            boxShadow: "20",
            fontWeight: "bold",

            // FULL SCREEN DIMENSIONS
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",

            transformStyle: "preserve-3d",
            transition: "0.6s",
            transformOrigin: "center center",
          }}
        >
          <Card
            sx={{
              padding: "10px",
              backgroundColor: "#e6e8dc",
              height: "95%",
              width: "90%",
              borderRadius: "50px",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              border: "2px solid black",
            }}
          >
            <Box
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                borderTop: "40px",
                marginTop: "-10px",
                paddingTop: "10px",
                backgroundColor: "#88ebe6",
                width: "110%",
                marginBottom: "10px",
                paddingBottom: "10px",
                height: "20%",
                display: "flex",
                justifyContent: "center",
                borderBottom: "5px solid #571122",
              }}
            >
              <Typography
                style={{
                  fontSize: "40px",
                  fontWeight: "bolder",
                  textShadow: `3px 3px #558ABB`,
                  alignSelf: " center",
                  textDecoration: "underline",
                }}
                color={"secondary"}
              >
                CHALLENGED!
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  fontSize: "20px",

                  alignSelf: " center",
                }}
                color={"secondary"}
              >
                {challenge.userName} challenges that {challenge.playerFakeDef} is a fitting defintion of {word}
              </Typography>
              <div className="temp-scorecard-messages">
                <h1>Results</h1>
                {aiResponse}
              </div>
           
            </Box>
          
          </Card>
        </Card>
      )}
    </div>
  );
};

export default TempScoreCard;
