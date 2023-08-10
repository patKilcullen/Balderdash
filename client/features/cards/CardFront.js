import React, { useEffect, useState, useMemo } from "react";


// MaterialUI
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Timer from "../gamePlay/Timer";
import DefInputBox from "../gamePlay/DefInputBox";


const CardFront = ({
  bottomCard,
  checkIfTied,
  half,
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
  playerTurnName,
  reloadScores,
  setDefinition,
  setWord,
  setTimer,
  setChoseWord,
  singleGame,
}) => {
  // State to manage the current side of the card
  const [sideState, setSideState] = useState(side);
  useEffect(() => {
    setSideState(side);
  }, [side]);

  // State to manage the temporary back of the card
  const [tempBack, setTempBack] = useState(false);
  const showBackOfCard = (sideX, X) => {
    if (sideX === "front") {
      setSideState(sideX);
    } else if (sideX === "back") {
      setTempBack(true);
    }
  };

  // State to manage the hidden status of the card
  const [hidden, setHidden] = useState(false);
  const makeHidden = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  // Memoized variables for optimized performance
  const cardBackgroundColor = useMemo(() => {
    // Calculate the background color based on the current card state
    if (sideState === "front" && !defCards && !hidden && !tempBack) {
      return "#88ebe6";
    } else if (sideState === "front" && defCards && !hidden && !tempBack) {
      return "#88ebe6";
    } else {
      return "#e6e8dc";
    }
  }, [sideState, defCards, hidden, tempBack]);

  const cardDimensions = useMemo(() => {
    // Calculate the dimensions of the card based on the current state
    if (timer || (fullScreen && !defCards)) {
      return {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: "100vh",
        width: "90%",
        marginLeft: "-1vw",
      };
    } else {
      return {
        height: timer || (fullScreen && !hidden) ? "100vh" : "350px",
        width:
          (timer && !defCards) || (fullScreen && !defCards)
            ? "90%"
            : defCards
            ? "85%"
            : "200px",
        marginLeft:
          (timer && !defCards) || (fullScreen && !defCards) ? "-1vw" : "0",
      };
    }
  }, [timer, fullScreen, defCards, hidden]);

  const cardBorderStyle = useMemo(() => {
    // Calculate the card border style based on the hidden state
    return hidden ? {} : { border: "2px solid black" };
  }, [hidden]);

  const frontCardStyle = useMemo(() => {
    // Calculate the front card style based on the hidden state
    return {
      minHeight: "600px",
      minWidth: "110%",
      display: "flex",
      flexDirection: "column",
      borderTop: hidden ? "0px" : null,
      position: "relative",
    };
  }, [hidden]);


  
  return (
    <div>
      {/* Main Card */}
      <Card
        sx={{
          // Styling for the main card container
          zIndex: bottomCard === false ? "1" : "2000",
          position: bottomCard === false ? "relative" : "absolute",
          top: bottomCard === false ? "0" : "365px",
          left: bottomCard === false ? "0" : "75px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:  cardBackgroundColor, // Use the cardBackgroundColor useMemo variable
          padding: "1em 1em",
          borderRadius: !hidden ? "50px" : null,
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",
          // CARD FLIP
          transform: flip ? "rotateY(360deg) " : null,
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transition: "0.9s",
          transformOrigin: "center center",
          // FULL SCREEN CARD DIMENSIONS
          ...cardDimensions, // Use the cardDimensions useMemo variable
        }}
      >
        {/* CARD BORDER */}
        <Card
          sx={{
            // Styling for the inner card container
            padding: "10px",
            backgroundColor:
              sideState === "front" && !tempBack ? "#e6e8dc" : "#88ebe6",
            height: hidden ? "100vh" : "95%",
            width: hidden ? "100%" : "90%",
            borderRadius: !hidden ? "50px" : null,
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            ...cardBorderStyle, // Use the cardBorderStyle useMemo variable
            top: hidden ? "0px" : null,
          }}
        >
          {/* FRONT OF CARD */}
          {sideState === "front" ? (
            <div
              style={{
                ...frontCardStyle, // Use the frontCardStyle useMemo variable
              }}
            >
              {/* Top Portion of Front of Card */}
              {!hidden ? (
                <Box
                  style={{
                    visibility: hidden || tempBack ? "hidden" : null,
                    fontSize: "40px",
                    fontWeight: "bold",
                    borderTop: "40px",
                    marginTop: "-10px",
                    paddingTop: "10px",
                    backgroundColor: "#88ebe6",
                    width: "110%",
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    height: hidden ? "0px" : "20%",
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "5px solid #571122",
                  }}
                >
                  {/* TOP portion of front of card */}
                  <Typography
                    style={{
                      fontSize: "40px",
                      fontWeight: "bolder",
                      textShadow: `3px 3px #558ABB`,
                      alignSelf: " center",
                      textDecoration: "underline",
                      minHeight: hidden ? "0px" : "20%",
                      maxHeight: hidden ? "0px" : null,
                    }}
                    color={"secondary"}
                  >
                    {top && !hidden && !tempBack ? top : null}
                  </Typography>
                </Box>
              ) : null}

              {/* BOTTOM portion of front of card */}
              {!hidden ? (
                <Box>
                  <div
                    className="temp-scorecard-messages"
                    sx={{
                      minHeight: defCards ? "600px" : null,
                      visibility: hidden ? "hidden" : null,
                      height: hidden ? "0" : null,
                    }}
                  >
                    {bottom && !hidden ? (
                      <div style={{ paddingLeft: "10%", width: "90%" }}>
                        {bottom}
                      </div>
                    ) : null}
                  </div>
                </Box>
              ) : null}

              {/* TIMER starts Timer component with set time for the player to input
            their own definition, then sets the timer in the Guess Defs Component */}
              {timer ? (
                <Timer
                  checkIfTied={checkIfTied}
                  setTempBack={setTempBack}
                  showBackOfCard={showBackOfCard}
                  makeHidden={makeHidden}
                  top={top}
                  game={game}
                  username={username}
                  userId={userId}
                  userScore={userScore}
                  gameName={gameName}
                  gameId={game.id}
                  playerTurnName={playerTurnName}
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

          {/* BACK OF CARD */}
          {sideState === "back" || tempBack ? (
            <div
              className="card-logo"
              style={{
                display: "flex",
                flexDirection: "column",
                position: sideState !== "back" ? "fixed" : null,
                marginTop: sideState !== "back" ? "-5%" : null,
              }}
            >
              <Typography
                className="card-logo-text"
                style={{ fontSize: "65px", fontWeight: "bold" }}
                color={"secondary"}
              >
                {/* half refers to if the game name on the back of the card needs to be split in half */}
                {!half ? "Balder..." : half.first}
              </Typography>

              <Typography
                className="card-logo-text"
                style={{ fontSize: "70px", fontWeight: "bold" }}
                color={"secondary"}
              >
                {!half ? "...dash" : half.second}
              </Typography>
            </div>
          ) : null}

          {/* CHOOSE DEFINITION BUTTON */}
          {defCards &&
          userScore.turnNum !== singleGame.turn &&
          userScore.accepted === true ? (
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
        }
export default CardFront;
