import React, { useEffect, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Timer from "../gamePlay/Timer";
import { Button } from "@mui/material";

import DefInputBox from "../gamePlay/DefInputBox";

const CardFront = ({
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
  singleGame
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
 
  const [tempBack, setTempBack] = useState(false)
  const showBackOfCard = (sideX, X) => {
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
            sideState === "front" && !defCards && !hidden && !tempBack
              ? "#88ebe6"
              : sideState === "front" && defCards && !hidden && !tempBack
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

          // zIndex: defCards === true ? "99999" : null,

          //NORMAL CARD DIMENTSIONS
          // height: timer || (fullScreen && !hidden) ? "95%" : "88%",
          // minHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",
          // maxHeight: timer || (fullScreen && !hidden) ? "100vh" : "350px",

          height: timer || (fullScreen && !hidden) ? "100vh": "350px",

          
          // width:
          // (timer && !defCards) || (fullScreen && !defCards && !hidden)
          //   ? "90%"
          //   : defCards
          //   ? "85%"
          //   : "200px",
          width:
          (timer && !defCards) || (fullScreen && !defCards)
            ? "90%"
            : defCards
            ? "85%"
            // : half === true 
            // ? "70%"
            : "200px",
   
         
          // minWidth:
          //   (timer && !defCards) || (fullScreen && !defCards && !hidden)
          //     ? "90%"
          //     : defCards
          //     ? "85%"
          //     : "200px",
          // maxWidth:
          //   (timer && !defCards) || (fullScreen && !defCards && !hidden)
          //     ? "90%"
          //     : defCards
          //     ? "85%" 
          //     : "200px",
      
          marginLeft:(timer && !defCards) || (fullScreen && !defCards)
          ? "-1vw"
          // all ampped definition cards
          : defCards
          ? "2vw"
          // main unflpeed card, keep at 0
          : "0",
        }}
      >
        {/* CARD BORDER */}
        <Card
          sx={{
            padding: "10px",
            backgroundColor: sideState === "front" && !tempBack? "#e6e8dc" : "#88ebe6",
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
                    visibility: hidden || tempBack ? "hidden" : "null",
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
                      // display: tempBack ? "none" : null,
                     
                      // backgroundColor: tempBack ? "red" : null,
                     
                    }}
                    color={"secondary"}
                  >
                    {top && !hidden && ! tempBack? top : null}
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
                    {bottom && !hidden ? <div style={{paddingLeft: "10%", width: "90%"}}>{bottom}</div> : null}
                  </div>
                </Box>
              ) : null}

              {/* TIMER starts Timer component with set time to for player to input
            their own defintion, then sets the timer in the Guess Defs Component */}

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
          {sideState === "back"  || tempBack ? (
            <div
              className="card-logo"
              style={{ display: "flex", flexDirection: "column", position: sideState !== "back" ? "fixed" : "null", marginTop: sideState !== "back" ? "-5%" : "null"  }}
            >
              <Typography
                className="card-logo-text"
                style={{ fontSize: "65px", fontWeight: "bold", }}
                color={"secondary"}
              >
                {!half ? "Balder..." : half.first}
              </Typography>

              <Typography
                className="card-logo-text"
                style={{ fontSize: "70px", fontWeight: "bold" }}
                color={"secondary"}
              >
                {!half ? "...dash" : half.second}
                {/* ...dash */}
              </Typography>
            </div>
          ) : null}









          {/* CHOOSE DEFINITION BUTTON  only available is card in one of the card players get to choose*/}
          {defCards && userScore.turnNum !== singleGame.turn && userScore.accepted === true? (
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
