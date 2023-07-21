import React, { useState, useContext, useEffect, useRef } from "react";

import { SocketContext } from "../../app/SocketProvider";

// import TextareaAutosize from "@mui/base/TextareaAutosize";

import { TextareaAutosize, Button, TextField, FormControl, FormLabel, Container } from "@mui/material";


const DefInputBox = ({showBackOfCard, makeHidden, gameName, userId, playerTurnName }) => {
  const [playerDef, setPlayerDef] = useState("");
  const [seeInput, setSeeInput] = useState(true);

  const clientSocket = useContext(SocketContext);

  const inputRef = useRef();

  // Set focus on input box
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Sends players fake definition to player whos turn it is through a socket, 
  // Where it will be added  to array of defs. Thenk clears the definition input box
  const handleEnterFakeDef = (e) => {
    e.preventDefault();
  
    clientSocket.emit("send_player_fake_def", {
      playerDef,
      room: gameName,
      userId,
      playerTurnName,
    });
    setSeeInput(false);
    setPlayerDef("");
    showBackOfCard("back")
  };

  return (
    <div>
      {/* {seeInput ? (
        <form onSubmit={handleEnterFakeDef}>
          <label>
            Enter you fake Def here:
            <TextareaAutosize
              placeholder="Write your definition here..."
              minRows={10}
              ref={inputRef}
              style={{ backgroundColor: "white", width: "100%" }}
              type="textarea"
              name="name"
              value={playerDef}
              onChange={(e) => setPlayerDef(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : null} */}

 {seeInput ? (
<Container>
      <form style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5vh"}} onSubmit={handleEnterFakeDef}>
        <FormControl fullWidth>
          {/* <FormLabel   id="def-input-title"
              color="secondary"
              sx={{ fontWeight: "bold", overflow: "scroll" }}>Enter your definition here:</FormLabel> */}
          <TextareaAutosize
            placeholder=" Write your definition here..."
            minRows={20}
            ref={inputRef}
            style={{ marginLeft: "-5px", backgroundColor: "white", width: "100%", border: "4px solid #571122", borderRadius: "20px" }}
            type="textarea"
            name="name"
            value={playerDef}
            onChange={(e) => setPlayerDef(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" type="submit">
          Submit Definition
        </Button>
      </form>
    </Container>
    ) : null} 
    </div>
    
  );
};

export default DefInputBox;
