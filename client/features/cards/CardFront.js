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
  playerTurnName,
  reloadScores,
  setDefinition,
  setWord,
  setTimer,
  setChoseWord,
}) => {
  // HIDDEN changes parent element dimentions so that each child card take up
  // full screen when player look through which definition to choose
  const [hidden, setHidden] = useState(false);
  const makeHidden = () => {
    setHidden(!hidden);
  };

  const [sideState, setSideState] = useState("");
  useEffect(() => {
    setSideState(side);
  }, [side]);
  // console.log("sideSTAE: ", sideState)
  const [tempBack, setTempBack] = useState(false)
  const showBackOfCard = (sideX, X) => {
    console.log("SHOW BACK", sideX, X);
    sideX === "front" ? setSideState(sideX) 
    : sideX === "back" ?
setTempBack(true) 

    : null
   
  };

  return (
    // <div id="temp-scorecard">
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:
            sideState === "front" && !defCards && !hidden
              ? "#88ebe6"
              : sideState === "front" && defCards && !hidden
              ? "#88ebe6"
              : "#e6e8dc",
          padding: "1em 1em",
          borderRadius: !hidden ? "50px" : "null",
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
          position: timer || (fullScreen && !defCards) ? "fixed" : null,
          top: timer || fullScreen ? "0" : null,
          right: timer || fullScreen ? "0" : null,
          bottom: timer || fullScreen ? "0" : null,
          left: timer || fullScreen ? "0" : null,

          zIndex: defCards === true ? "99999" : null,

          //NORMAL CARD DIMENTSIONS
          height: timer || (fullScreen && !hidden) ? "95%" : "88%",
          minHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",
          maxHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",
          minWidth:
            (timer && !defCards) || (fullScreen && !defCards && !hidden)
              ? "90%"
              : defCards
              ? "85%"
              : "200px",
          maxWidth:
            (timer && !defCards) || (fullScreen && !defCards && !hidden)
              ? "90%"
              : defCards
              ? "85%"
              : "200px",
          marginLeft: defCards ? "2vw" : null,
        }}
      >
        {/* CARD BORDER */}
        <Card
          sx={{
            padding: "10px",
            backgroundColor: sideState === "front" ? "#e6e8dc" : "#88ebe6",
            height: hidden ? "100vh" : "95%",
            width: hidden ? "100%" : "90%",
            borderRadius: !hidden ? "50px" : "null",

            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            border: hidden ? "null" : "2px solid black",
            top: hidden ? "0px" : null,
          }}
        >


          {/* FRONT OF CARD */}
          {sideState === "front"  ?(
            <div
              style={{
                minHeight: "600px",
                minWidth: "110%",
                display: "flex",
                flexDirection: "column",

                borderTop: hidden ? "0px" : null,
                position: "relative",
              }}
            >
              {!hidden ? (
                <Box
                  style={{
                    visibility: hidden ? "hidden" : "null",
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
                    {top && !hidden ? top : null}
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
                      visibility: hidden ? "hidden" : "null",
                      height: hidden ? "0" : "null",
                    }}
                  >
                    {bottom && !hidden ? <div>{bottom}</div> : null}
                  </div>
                </Box>
              ) : null}

              {/* TIMER starts Timer component with set time to for player to input
            their own defintion, then sets the timer in the Guess Defs Component */}

              {timer ? (
                <Timer
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

          
{/* {sideState === "front"  || sideState === "back" && timer ?
<div>
  {timer ? (
    <Timer
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
:null} */}

          {/* BACK OF CARD*/}
          {sideState === "back" ? (
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

           {tempBack === true ? (
            // <div
            //   className="card-logo"
            //   style={{ display: "flew", flexDirection: "column", zIndex: "99999999999", position: "fixed", top: "0", left: "0" }}
            // >

<Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:
            sideState === "front" && !defCards && !hidden
              ? "#88ebe6"
              : sideState === "front" && defCards && !hidden
              ? "#88ebe6"
              : "#e6e8dc",
          padding: "1em 1em",
          borderRadius: !hidden ? "50px" : "null",
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
          position: timer || (fullScreen && !defCards) ? "fixed" : null,
          top: timer || fullScreen ? "0" : null,
          right: timer || fullScreen ? "0" : null,
          bottom: timer || fullScreen ? "0" : null,
          left: timer || fullScreen ? "0" : null,

          zIndex: defCards === true ? "99999" : null,

          //NORMAL CARD DIMENTSIONS
          height: timer || (fullScreen && !hidden) ? "95%" : "88%",
          minHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",
          maxHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",
          minWidth:
            (timer && !defCards) || (fullScreen && !defCards && !hidden)
              ? "90%"
              : defCards
              ? "85%"
              : "200px",
          maxWidth:
            (timer && !defCards) || (fullScreen && !defCards && !hidden)
              ? "90%"
              : defCards
              ? "85%"
              : "200px",
          marginLeft: defCards ? "2vw" : null,
        }}
      >
        {/* CARD BORDER */}
        <Card
          sx={{
            padding: "10px",
            backgroundColor: sideState === "front" ? "#e6e8dc" : "#88ebe6",
            height: hidden ? "100vh" : "95%",
            width: hidden ? "100%" : "90%",
            borderRadius: !hidden ? "50px" : "null",

            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            border: hidden ? "null" : "2px solid black",
            top: hidden ? "0px" : null,
          }}
        >
              <Typography
                className="card-logo-text"
                style={{ fontSize: "65px", fontWeight: "bold", marginTop: "50%" }}
                color={"secondary"}
              >
                Balder...
              </Typography>

              <Typography
                className="card-logo-text"
                style={{ fontSize: "70px", fontWeight: "bold", }}
                color={"secondary"}
              >
                ...dash
              </Typography>
            {/* </div> */}
            </Card>
            </Card>
          ) : null}

          {/* CHOOSE DEFINITION BUTTON  only available is card in one of the card players get to choose*/}
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
