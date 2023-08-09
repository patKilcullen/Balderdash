import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// SLICES/STATE REDUCERS, ETC.
import { fetchHighestGameScores } from "./scoresSlice";
import { editGameTurn } from "../games/singleGameSlice";

// SOCKET
import { SocketContext } from "../../app/SocketProvider";

// MATERIAL UI
import { Card, Box, Typography, Button } from "@mui/material";

const FinalCard = ({ game, userScore }) => {
// COMPONENT STATE
const [winner, setWinner] = useState("");
const [winnerScore, setWinnerScore] = useState(0);

// SOCKET
  const clientSocket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GETS HIGHEST SCORE AND SETS THE WINNER TO INFO
  useEffect(() => {
    dispatch(fetchHighestGameScores(game.id)).then((res) => {
      setWinner(res.payload[0].user);
      setWinnerScore(res.payload[0].score);
    });
  }, []);

  // PLAY AGAIN
  const handlePlayAgain = () => {
    dispatch(
      editGameTurn({
        gameId: game.id,
        turn: game.numPlayers,
        roundsLeft: game.rounds,
        started: false,
      })
    ).then(() => {
      clientSocket.emit("send_play_again", {
        room: game.name,
        gameId: game.id,
      });
    });
  };

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
              Game OVER
            </Typography>
          </Box>
          <Box>
            <div className="temp-scorecard-messages">
              {
                <h1 style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      fontSize: "60px",
                      fontWeight: "bolder",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    {winner.username}
                  </span>{" "}
                  <span
                    style={{
                      fontSize: "40px",
                      fontFamily: "none",
                    }}
                  >
                    is the WINNER with{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "60px",
                      fontWeight: "bolder",
                      textDecoration: "underline",
                    }}
                  >
                    {winnerScore} point{winnerScore > 1 ? "s" : null}
                  </span>
                </h1>
              }
            </div>
          </Box>
          <Box style={{ display: "flex", gap: "5%" }}>
            {userScore && game.ownerId === userScore.userId ? (
              <Button
                className={"pulse"}
                onClick={() => handlePlayAgain()}
                sx={{ fontSize: 20, marginTop: "15px" }}
                variant="contained"
              >
                <Typography color={"secondary"} sx={{ fontSize: 30 }}>
                  Play Again
                </Typography>
              </Button>
            ) : null}
            <Button
              className={"pulse"}
              onClick={() => navigate("/home")}
              sx={{ fontSize: 20, marginTop: "15px" }}
              variant="contained"
            >
              <Typography color={"secondary"} sx={{ fontSize: 30 }}>
                Return home
              </Typography>
            </Button>
          </Box>
        </Card>
      </Card>
    </div>
  );
};

export default FinalCard;
