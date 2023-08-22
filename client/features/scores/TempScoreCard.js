import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";

import { SocketContext } from "../../app/SocketProvider";

import { clearTempScoreCardMessages} from "../gamePlay/gamePlaySlice";

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

  const [pause, setPause] = useState(false);
  const handleTogglePause = () => {
    setPause(!pause);
    clientSocket.emit("send_pause_tempScoreCard_countdown", { gameName });
  };

  console.log("WORJD ANHD DEF IN TEMO SCORE: ", word, definition)
 

  useEffect(() => {
    console.log("score card count down PAUSE: ", pause);
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

  // SOCKET RECIEVE
  useEffect(() => {
console.log("GAME NAEM IN TEMO SCOKET: pausyyyyy: ", pause)
    clientSocket.on("recieve_pause_tempScoreCard_countdown", (room) => {
      console.log("ROOM AND GAME NAME: ", room, gameName)
      room === gameName ? setPause(!pause) : null;


    });

  }, [clientSocket, gameName, pause]);

  return (
    <div id="temp-scorecard">
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
    </div>
  );
};

export default TempScoreCard;
