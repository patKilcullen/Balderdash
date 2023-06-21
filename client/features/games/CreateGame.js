import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createGame } from "./allGamesSlice";
import { createScore } from "../scores/scoresSlice";

// SOCKET
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";

// MATERIAL UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fontSize, height } from "@mui/system";
import Card from "@mui/material/Card";
////////////////

const CreateGame = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const [gameName, setGameName] = useState("");
  const [rounds, setRounds] = useState(1);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SOCKET
  //  const clientSocket = socket.connect("http://localhost:8080");
  const clientSocket = useContext(SocketContext);

  const handleCreateGame = (e) => {
    e.preventDefault();

    !isNaN(rounds) && rounds > 0
      ? dispatch(
          createGame({
            userId: userId,
            name: gameName,
            rounds: rounds,
            roundsLeft: rounds,
            winner: "null",
            started: false,
            complete: false,
            ownerId: userId,
            publicX: true,
            numPlayers: 1,
            turn: 1,
          })
        )
          .then((res) => {
            clientSocket.emit("join_room", {
              roomId: res.payload.id,
              userId: userId,
            });
            clientSocket.emit("join-da-room", res.payload.id);
            dispatch(
              createScore({
                score: 0,
                accepted: true,
                turn: true,
                turnNum: 1,
                gameId: res.payload.id,
                userId: userId,
              })
            );
          })
          .then(() => {
            navigate("/home");
          })
      : setError("Rounds must be a postive integer");
  };
  console.log("ERROR: ", error);

  return (
    <Container
      color="secondary"
      component="main"
      maxWidth="sm"
      sx={{ height: "100vh" }}
    >
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#e6e8dc",
          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",
        }}
      >
        
        <Typography
          color="secondary"
          component="h1"
          variant="h4"
          sx={{
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Create a New Game
        </Typography>
        <Box
          component="form"
          onSubmit={handleCreateGame}
          noValidate
          sx={{ mt: 3 }}
        >
    
          <Typography
            color="black"
            component="h2"
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            Game Name:
          </Typography>
          <input
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "50px",
              fontWeight: "bold",
              font: "200px",
              width: "100%",
              height: "50px",
              fontSize: "20px",
            }}
            placeholder="pick a fun game name..."
          

            type="text"
            name="name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
  

          <Typography
            color="black"
            component="h2"
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            Rounds:
          </Typography>
          <input
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "50px",

              height: "50px",
              fontSize: "20px",
            }}
            type="number"
            name="rounds"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              height: "60px",
              fontSize: "1.25rem",
              boxShadow: "20",
              border: "2px solid black",
              borderRadius: "25px",
            }}
            color="primary"
          >
            <Typography
              color="secondary"
              component="h2"
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              Create Game
            </Typography>
          </Button>
        </Box>
        {/* </Card> */}
        {error ? <div style={{ color: "red" }}>{error}</div> : null}
      </Box>
    </Container>
  );
};

export default CreateGame;
