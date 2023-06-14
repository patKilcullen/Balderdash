import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardFront = ({ top, bottom, side, flip }) => {
  console.log("BOTTOM IN CARDFRENT: ", bottom);
//   const [flipX, setFlipX] = useState(false);
//   useEffect(()=>{
// setFlipX(true)
//   }, [flip])

  return (
    // <div id="temp-scorecard">
    <div>
      <Card
        sx={{
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
           backgroundColor: side === "front" ?  "#88ebe6": "#e6e8dc",
        //   backgroundColor: "#88ebe6",
          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",

        
          transformStyle: "preserve-3d",
          transition: "0.6s",
          transformOrigin: "center center",

          // FLIP
        //  transform: "rotateY(360deg)", 
          transform: flip ? "rotateY(360deg) " : null,

          // transform: flip ? "rotateY(180deg) translateX(-50%)" : null,
          // transform: flip ? "translateX(-50%)" : null
          // transform: translateX(-50%);

          // FULL SCREEN DIMENSIONS
          //   position: "fixed",
          //   top: "0",
          //   right: "0",
          //   bottom: "0",
          //   left: "0",

          //NORMAL CAR DIMENTSIONS
          height: "100%",
          width: "100%",
          minHeight: "300px",
          maxHeight: "350px",
          maxWidth: "200px",
        }}
      >
        <Card
          sx={{
            // backgroundColor: !word || !word.length ? "#88ebe6" : "#e6e8dc",
            // backgroundColor: "#e6e8dc",
            padding: "10px",
            // backgroundColor: !word || !word.length ? "#88ebe6" : "#e6e8dc",
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

            {/* FRONT  */}

{side === "front" ? 
<div>
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
              {top}
            </Typography>
          </Box>
          <Box>
            <div className="temp-scorecard-messages">
              {bottom ? <div>{bottom}</div> : null}
              {/* {bottom && bottom.length > 1
          ? bottom.map((message) => {
              return (
                <div >
                  <div>{message}</div>
                  <div className="line-break"></div>
                </div>
              );
            })
          : null}{" "} */}
            </div>
          </Box>
          </div>
          :null}

{/* BACK */}
{side === "back" ? 
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
                  {/* <span style={{ fontSize: "35px", fontWeight: "bold" }}>
                {` ${word}`}
              </span> */}
                </Typography>

                <Typography
                  className="card-logo-text"
                  style={{ fontSize: "70px", fontWeight: "bold" }}
                  color={"secondary"}
                >
                  ...dash
                </Typography>
              </div>
              :null}

        </Card>
      </Card>


    </div>
  );
};

export default CardFront;
