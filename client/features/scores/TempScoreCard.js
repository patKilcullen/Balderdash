import React, { useEffect, useState } from "react";


import {Card, Box, Typography} from "@mui/material"

const TempScoreCard = ({ tempScoreCard, showTiedGame }) => {
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
            <div className="temp-scorecard-messages">
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
        </Card>
      </Card>
    </div>
  );
};

export default TempScoreCard;
