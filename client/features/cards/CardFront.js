import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Timer from "../gamePlay/Timer";
import { Button } from "@mui/material";

const CardFront = ({
  def,
  handleChooseWord,
  defCards,
  top,
  bottom,
  side,
  fullScreen,
  flip,
  timer,
  game,
  username,
  userId,
  userScore,
  gameName,
  gameId,
  playerTurnName,
  reloadScores,
  setDefinition,
  setWord,
  setTimer,
  setChoseWord,
}) => {
  return (
    // <div id="temp-scorecard">
    <div>
      <Card
        sx={{
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          backgroundColor:
            side === "front" && !defCards
              ? "#88ebe6"
              : side === "front" && defCards
              ? "#88ebe6"
              : "#e6e8dc",

          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",

          // FLIP
          //  transform: "rotateY(360deg)",
          transform: flip ? "rotateY(360deg) " : null,
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transition: "0.9s",
          transformOrigin: "center center",

          // transform: flip ? "rotateY(180deg) translateX(-50%)" : null,
          // transform: flip ? "translateX(-50%)" : null
          // transform: translateX(-50%);

          // FULL SCREEN DIMENSIONS

          position: timer || (fullScreen && !defCards) ? "fixed" : null,
          top: timer || fullScreen ? "0" : null,
          right: timer || fullScreen ? "0" : null,
          bottom: timer || fullScreen ? "0" : null,
          left: timer || fullScreen ? "0" : null,

          //NORMAL CAR DIMENTSIONS
          height: timer || fullScreen ? "95%" : "88%",
          minHeight: timer || fullScreen ? "100vh" : "350px",
          maxHeight: timer || fullScreen ? "100vh" : "350px",
          minWidth: timer || fullScreen ? "90%" : "200px",
          maxWidth: timer || fullScreen ? "90%" : "200px",
        }}
      >
        <Card
          sx={{
            padding: "10px",

            backgroundColor: side === "front" ? "#e6e8dc" : "#88ebe6",
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
          {/* FRONT OF CARD */}
          {side === "front" ? (
            <div
              style={{
                minHeight: "600px",
                minWidth: "110%",
                display: "flex",
                flexDirection: "column",
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
                    minHeight: "20%",
                  }}
                  color={"secondary"}
                >
                  {top}
                </Typography>
              </Box>
              <Box>
                {/* <div className="temp-scorecard-messages"> */}
                <div
                  className="temp-scorecard-messages"
                  sx={{ minHeight: defCards ? "600px" : null }}
                >
                  {bottom ? <div>{bottom}</div> : null}
                </div>
              </Box>

              {timer ? (
                <Timer
                  top={top}
                  game={game}
                  username={username}
                  userId={userId}
                  userScore={userScore}
                  gameName={gameName}
                  gameId={game.id}
                  playerTurnName={playerTurnName}
                  // definition={definition}
                  definition={bottom}
                  reloadScores={reloadScores}
                  setDefinition={setDefinition}
                  setWord={setWord}
                  setTimer={setTimer}
                  setChoseWord={setChoseWord}
                />
              ) : null}
            </div>
          ) : null}

          {/* BACK OF CARD*/}
          {side === "back" ? (
            <div
              className="card-logo"
              style={{ display: "flew", flexDirection: "column" }}
            >
              <Typography
                className="card-logo-text"
                style={{ fontSize: "65px", fontWeight: "bold" }}
                color={"secondary"}
              >
                Balder...
              </Typography>

              <Typography
                className="card-logo-text"
                style={{ fontSize: "70px", fontWeight: "bold" }}
                color={"secondary"}
              >
                ...dash
              </Typography>
            </div>
          ) : null}
          {defCards ? (
            <Button
              sx={{ alignSelf: "center" }}
              variant="contained"
              size="large"
              onClick={() => handleChooseWord(def)}
            >
              {" "}
              Choose Definition
            </Button>
          ) : null}
        </Card>
      </Card>
    </div>
  );
};

export default CardFront;
