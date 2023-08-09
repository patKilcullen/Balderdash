import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// SLICES/STATE REDUCERS, ETC.
import {
  fetchSingleGame,
  selectSingleGame,
  findGameByName,
} from "./singleGameSlice";

// COMPONENTS
import CardFront from "../cards/CardFront";

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

const SearchGame = () => {
  // COMPONENT STATE
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState(false);
  const [foundGame, setFoundGame] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SEARCH FOR A GAME
  const handleSearchGame = (e) => {
    e.preventDefault();
    dispatch(findGameByName(gameName)).then((game) => {
      game.payload === null
        ? setError("Can't find that game...")
        : setFoundGame(game.payload);
    });
  };

  return (
    <Container
      color="secondary"
      component="main"
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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
            Search for a Game
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearchGame}
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
                Search Game
              </Typography>
            </Button>
          </Box>
          {/* </Card> */}
          {error ? <div style={{ color: "red" }}>{error}</div> : null}
        </Box>
      </Box>
      {foundGame && foundGame.name ? (
        <Link to={`/games/${foundGame.id}`}>
          <CardFront
            side={"back"}
            half={{
              first: `${
                foundGame.name.length < 20
                  ? foundGame.name
                  : foundGame.name.slice(
                      0,
                      Math.ceil(foundGame.name.length / 2)
                    )
              }`,
              second:
                foundGame.name.length < 20
                  ? null
                  : foundGame.name.slice(Math.ceil(foundGame.name.length / 2)),
            }}
          ></CardFront>
        </Link>
      ) : null}
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

export default SearchGame;
