import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// import { createGame } from "./allGamesSlice";
// import { createScore } from "../scores/scoresSlice";


import { fetchSingleGame, selectSingleGame } from "./singleGameSlice";

import CardFront from "../cards/CardFront";

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

const SearchGame = () => {
  const userId = useSelector((state) => state.auth.me.id);
//  const foundGame = useSelector(selectSingleGame)
//  console.log("FOUND GAME: ", foundGame)
  const [gameName, setGameName] = useState("");
  const [error, setError] = useState(false)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SOCKET
  //  const clientSocket = socket.connect("http://localhost:8080");
  const clientSocket = useContext(SocketContext);




const [foundGame, setFoundGame] = useState("")
console.log("FOUND GAME: ", foundGame)

  const handleSearchGame = (e) => {
    e.preventDefault();
    console.log("THIS GAM NAME: ", gameName)
dispatch(fetchSingleGame(gameName)).then((game)=>{
  setFoundGame(game.payload)
console.log("GAMEY GAME: ", game.payload)

})
 
  //  setGameName("")
  };

  return (
    <Container
      color="secondary"
      component="main"
      maxWidth="sm"
      sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
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
      {foundGame && foundGame.name ?
      <Link to={`/games/${foundGame.id}`} ><CardFront side={"back"} half={{first: `${foundGame.name.length < 20 ? foundGame.name : foundGame.name.slice(0, Math.ceil(foundGame.name.length / 2))}`, second:  foundGame.name.length < 20 ? null : foundGame.name.slice(Math.ceil(foundGame.name.length / 2)) }}></CardFront></Link> 
      :null}
      <Button type="button" color='secondary' sx={{textDecoration: "underline", fontWeight: "bold"}} onClick={()=> navigate('/home')}>Home</Button>
    </Container>
  );
};

export default SearchGame;
