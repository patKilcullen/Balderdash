import React, { useState, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// SOCKET
import { SocketContext } from "../../app/SocketProvider";

import { askAI } from "./openAISlice";
import { selectWord } from "./gamePlaySlice";

// MaterialUI
import {
  TextareaAutosize,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Container,
} from "@mui/material";

const DefInputBox = ({
  showBackOfCard,
  gameName,
  userId,
  playerTurnName,
}) => {
  // COMPONENT STATE
  const [playerDef, setPlayerDef] = useState("");
  const [seeInput, setSeeInput] = useState(true);

  const clientSocket = useContext(SocketContext);

  const inputRef = useRef();

  const word = useSelector(selectWord)

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
    showBackOfCard("back");
  };

const dispatch = useDispatch()
  const handleTestAI = ()=>{
    console.log("TEST ASSHOLELELELELEL: ", playerDef)
    dispatch(askAI({word, definition: playerDef }));
  }
  return (
    <div>
      {seeInput ? (
        <Container>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5vh",
            }}
            onSubmit={handleEnterFakeDef}
          >
            <FormControl fullWidth>
              <TextareaAutosize
                placeholder=" Write your definition here..."
                minRows={20}
                ref={inputRef}
                style={{
                  marginLeft: "-5px",
                  backgroundColor: "white",
                  width: "100%",
                  border: "4px solid #571122",
                  borderRadius: "20px",
                }}
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
          <Button  onClick={handleTestAI} variant="contained" type="submit">
              AI TEST
            </Button>
        </Container>
      ) : null}
    </div>
  );
};

export default DefInputBox;
