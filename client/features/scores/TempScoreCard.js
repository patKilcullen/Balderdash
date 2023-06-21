import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TempScoreCard = ({ tempScoreCard }) => {
  const [countdown, setCountdown] = useState();
  const [showTempScoreCard, setShowTempScoreCard] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
        // setShowTempScoreCard(true);
      } else {
        // setShowTempScoreCard(false);
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    // NEEDED?
    return () => clearTimeout(timer);
  }, [countdown]);

 

 
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
              Round Results
            </Typography>
          </Box>
<Box>
<div className="temp-scorecard-messages">
        {tempScoreCard && tempScoreCard.length
          ? tempScoreCard.map((message) => {
              return (
                <div >
                  <div>{message}</div>
                  <div className="line-break"></div>
                </div>
              );
            })
          : null}{" "}
      </div> 

</Box>


        </Card>
      </Card>
    </div>
  );
};

export default TempScoreCard;

{
  /* <h1>Round Results</h1>
      <div>
        {testMessages && testMessages.length
          ? testMessages.map((message) => {
              return (
                <div className="temp-scorecard-messages">
                  <div>{message}</div>
                </div>
              );
            })
          : null}{" "}
      </div> */
}

//         <div id="scoreCard-message">{scoreCard && scoreCard.length ?
// scoreCard.map((message)=>{
//     return(
//       <div>
//         <h1>Round REsults</h1>
//         <div>{message}</div>
//         </div>
//     )
// })
//        :null} </div>