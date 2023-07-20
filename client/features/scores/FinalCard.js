import React, { useEffect, useState } from "react";
import { useDispatch,  } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchHighestGameScores } from "./scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";

// import Card from "@mui/material/Card";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import {Card, Box, Typography, Button} from "@mui/material"

const FinalCard = ({ game}) => {
  // const [countdown, setCountdown] = useState();
  // const [showTempScoreCard, setShowTempScoreCard] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (countdown > 0) {
  //       setCountdown(countdown - 1);
  //       // setShowTempScoreCard(true);
  //     } else {
  //       // setShowTempScoreCard(false);
  //     }
  //   }, 1000);

  //   // Cleanup the timer when the component unmounts
  //   // NEEDED?
  //   return () => clearTimeout(timer);
  // }, [countdown]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log("GAMEID in finalCard: ", game.id)
  const [winner, setWinner] = useState("")
  const [winnerScore, setWinnerScore] = useState(0)
  useEffect(()=>{
    dispatch(fetchHighestGameScores(game.id)).then((res)=>{
console.log("RES PAYLOAD IN FIANL CARD: ", res.payload)
setWinner(res.payload[0].user)
setWinnerScore(res.payload[0].turnNum)
    })
  }, [])

console.log("WINNNERL ", winner)
console.log("WINENR.TURNNUM: ", winner.turnNum)
const handlePlayAgain = ()=>{
  dispatch(editGameTurn({ gameId: game.id, turn: game.turn - 1, roundsLeft: game.rounds}))
}
 
  return (
    <div id="temp-scorecard">
      <Card
        sx={{
          // marginTop: 3,
          // marginBottom: 3,
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: !word || !word.length ? "#e6e8dc" : "#88ebe6",
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

          //NORMAL CAR DIMENTSIONS
          // height: "100%",
          // width: "100%",
          // minHeight: "300px",
          // maxHeight: "350px",
          // maxWidth: "200px",

          transformStyle: "preserve-3d",
          transition: "0.6s",
          transformOrigin: "center center",
          // transform: flip ? "rotateY(360deg) " : null,
        }}
      >
        <Card
          sx={{
            padding: "10px",
            // backgroundColor: !word || !word.length ? "#88ebe6" : "#e6e8dc",
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
              // textShadow: `5px 5px #558ABB`,
              borderTop: "40px",
              marginTop: "-10px",
              paddingTop: "10px",
              backgroundColor: "#88ebe6",
              width: "110%",
              // borderBottom: "40px",
              marginBottom: "10px",
              paddingBottom: "10px",
              height: "20%",
              display: "flex",
              justifyContent: "center",
              borderBottom: "5px solid #571122"
            }}
          >
            <Typography
              style={{
                fontSize: "40px",
                fontWeight: "bolder",
                 textShadow: `3px 3px #558ABB`,
                alignSelf: " center",
                textDecoration: "underline"
              }}
              color={"secondary"}
            >
              Game OVER
            </Typography>
          </Box>
<Box>
<div className="temp-scorecard-messages">
        {/* {tempScoreCard && tempScoreCard.length
          ? tempScoreCard.map((message) => {
              return (
                <div >
                  <div>{message}</div>
                  <div className="line-break"></div>
                </div>
              );
            })
          : null}{" "} */}
          {<h1 >{winner.username} <span style={{
                fontSize: "40px",
                fontWeight: "bolder",
                 textShadow: `3px 3px #558ABB`,
                alignSelf: " center",
                textDecoration: "underline"
              }}
              color={"primart"}>is the WINNER witn </span>{winnerScore} <span>points!</span></h1>}
      </div> 

</Box>
<Box style={{display: "flex", gap: "5%"}}>
<Button
              sx={{ alignSelf: "center" }}
              variant="contained"
              size="large"
               onClick={() => handlePlayAgain(def)}
            >
              {" "}
              Play Again
            </Button>
            <Button
              sx={{ alignSelf: "center" }}
              variant="contained"
              size="large"
              onClick={()=> navigate('/home')}
            >
              {" "}
              Return Home
            </Button>
            </Box>
        </Card>
      
      </Card>
    </div>
  );
};

export default FinalCard;
