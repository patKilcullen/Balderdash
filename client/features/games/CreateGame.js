import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { createGame } from "./allGamesSlice";
import { createGame } from "./singleGameSlice";

import { createScore } from "../scores/scoresSlice";

// MATERIAL UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@mui/material";

const CreateGame = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const [gameName, setGameName] = useState("");
  const [rounds, setRounds] = useState(1);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        ).then((res) => {
          dispatch(
            createScore({
              score: 0,
              accepted: true,
              turn: true,
              turnNum: 1,
              gameId: res.payload.id,
              userId: userId,
            })
          ).then((res) => {
            navigate(`/games/${res.payload.gameId}`);
          });
        })
      : setError("Rounds must be a postive integer");
  };

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
          backgroundColor: "#88ebe6",
          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#e6e8dc",
            padding: "1em 1em",
            borderRadius: "50px",
            border: "5px solid black",
            boxShadow: "20",
            fontWeight: "bold",
            height: "100%",
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
      </Box>
      <Button
        type="button"
        color="secondary"
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
        onClick={() => navigate("/home")}
      >
        Home
      </Button>
    </Container>
  );
};

export default CreateGame;
