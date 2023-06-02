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

  return (
    // <div>
    //   <div>CreateGame</div>
    //   <form onSubmit={handleCreateGame}>
    //     <label>
    //       Name:
    //       <input
    //         type="text"
    //         name="name"
    //         value={gameName}
    //         onChange={(e) => setGameName(e.target.value)}
    //       />
    //     </label>
    //     <label>
    //       Rounds:
    //       <input
    //         type="number"
    //         name="rounds"
    //         value={rounds}
    //         onChange={(e) => setRounds(parseInt(e.target.value))}
    //       />
    //     </label>

    //     <input type="submit" value="Submit" />
    //   </form>

    //   {error ?

    //   <div>{error}</div>
    //   : null}
    // </div>

    <Container component="main" maxWidth="sm" sx={{height: "100vh"}}>
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
          boxShadow: "20"
          
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
    
        </Avatar> */}
        <Typography color="secondary" component="h1" variant="h4">
          Create a New Game
        </Typography>
        <Box
          component="form"
          onSubmit={handleCreateGame}
          noValidate
          sx={{ mt: 3}}
        >
         
          
               <label>Game Name
          <input 
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "50px",
          
              width: "100%",
              height: "50px",
              fontSize: "20px",
            }}
            placeholder="pick a fun game name..."
            //  margin="normal"

            type="text"
            name="name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            //   fullWidth="true"
            // variant="standard"
            //   label="game name"
            //   value={name}
            //   name="name"
            // inputProps={{
            //   maxLength: CHARACTER_LIMIT
            // }}
            // helperText={`${title.length}/${CHARACTER_LIMIT}`}
            // onChange={(e) => setTitle(e.target.value) && handleChange(title)}
          />
          </label>

          <label>Rounds:</label>

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
            sx={{ mt: 3, mb: 2, height: "60px", fontSize: "1.25rem", boxShadow: "20", border: "2px solid black", borderRadius: "25px" }}
            color="primary"
          >
            Create Game
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateGame;
