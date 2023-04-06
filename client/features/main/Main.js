import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectWord,
  getWord,
  selectDefinition,
  getDefinition,
  getFakeWords,
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  clearFakeDefs,
  clearFakeWords,
  clearDefinition,
} from "./mainSlice";
import { selectMe } from "../auth/authSlice";

// SOCKET
import socket from "socket.io-client";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Main = () => {
  const dispatch = useDispatch();
  const word = useSelector(selectWord);
  const me = useSelector(selectMe);
  const username = me.username;

  const [tempWord, setTempWord] = useState("")

  useEffect(() => {
    const round = localStorage.getItem(`round`);
    round ? null : localStorage.setItem(`round`, 0);
    setRound(round);
  }, [round]);

  useEffect(() => {
    const score = localStorage.getItem(`${username}`);
    score ? null : localStorage.setItem(`${username}`, 0);
    // score ? setScore(score) : setScore(0)
    setScore(score);
  }, [score]);

  // SOCKET
  // socket.emit('word', word)
  const definition = useSelector(selectDefinition);

  useEffect(() => {
    setDefDisplayed(definition);
  }, [definition]);

  const [defDisplayed, setDefDisplayed] = useState("");

  const [defArray, setDefArray] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [reply, setReply] = useState("");
  const [replyAnimation, setReplyAnimation] = useState(false);
  const [replyDef, setReplyDef] = useState("");
  const [replyAnimationDef, setReplyAnimationDef] = useState(false);

  const [wordX, setWordX] = useState([]);
  console.log(`${username} WORD X: ${wordX}`);
  const handleGetDefs = () => {
    dispatch(getDefinition(word[0]))
      .then(() => {
        // setDefDisplayed(definition)
        handleGetFakeDefinitions();
      })
      .then(() => {
        pushDefs();
      });
  };

  const pushDefs = () => {
    for (const def of fakeDefinitions) {
      allDefs.push(def);
    }
    allDefs.push(definition);
    if (definition === "That word is too weird, try again") {
      setReply("That word is too weird, try again");
    }
  };

  // useEffect(() => {}, [handleGetFakeDefinitions]);

  const handleGetWord = () => {
    dispatch(getWord()).then(() => {
      handleGetFakeWords();
    });
  };

  const handleGetFakeWords = () => {
    dispatch(clearFakeWords());
    // dispatch(clearFakeDefs())

    allDefs = [];
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };
  const fakeWords = useSelector(selectFakeWords);

  const handleGetFakeDefinitions = () => {
    fakeWords
      .forEach((word) => {
        dispatch(getFakeDefinitions(word));
      })
      .then(() => {
        getFakeDefinitions(word[0]);
      });
  };

  const fakeDefinitions = useSelector(selectFakeDefinitions);

  let allDefs;
  // let finalArr = (finalArr = Object.values(defArray));
  let finalArr = Object.values(defArray);

  const play = () => {
    let allDefs = Object.values(fakeDefinitions);

    let radnomNum = Math.floor(Math.random() * allDefs.length);

    allDefs.splice(radnomNum, 0, definition);
    setDefArray(allDefs);
    dispatch(clearFakeDefs());
  };

  const handleChooseWord = (def) => {
    const scoreX = localStorage.getItem(`${username}`);
    const roundX = localStorage.getItem(`round`);
    setTempWord(word)
    allDefs = [];
    setWordX([]);
    setDefArray([]);
    setDater([]);
    setDefDisplayed("");
    localStorage.setItem(`round`, Number(roundX) + 1);
    const newRound = localStorage.getItem(`round`);
    setReply("CORRECT!");
    def === definitionX
      ? localStorage.setItem(`${username}`, Number(scoreX) + 1)
      : setReply(`Wrong!`);

    const newScore = localStorage.getItem(`${username}`);
    setScore(newScore);
    setRound(newRound);

    setReplyAnimation(true);
    setTimeout(() => {
      setReplyAnimation(false);
      setReplyAnimationDef(true);
      setTimeout(() => {
        setReplyAnimationDef(false);
      }, 5000)

    }, 5000)

    // setReplyAnimationDef(true);
    // setTimeout(() => {
    //   setReplyAnimationDef(false);
    // }, 10000)
  };

  // SOCKET
  // const clientSocket = socket(window.location.origin);
  const clientSocket = socket.connect("http://localhost:8080");

  // useEffect(() => {
  //   const scoreX = localStorage.getItem(`${username}`);
  //   localStorage.setItem(`${username}`, Number(scoreX) + 1);
  // }, [score]);

  useEffect(() => {
    clientSocket.emit("send_score", { score: score, username: username });
  }, [round]);

  useEffect(() => {
    clientSocket.emit("send_word", word);
  }, [word]);

  useEffect(() => {
    clientSocket.emit("send_definition", definition);
  }, [definition]);

  useEffect(() => {
    clientSocket.emit("send_defArray", defArray);
  }, [defArray]);

  const [dater, setDater] = useState([]);
  const [definitionX, setDefinitionX] = useState("");

  useEffect(() => {
    clientSocket.on("receive_score", (data) => {
      scoreArray.push(data);
    });
  }, [score]);

  let scoreArray = [];

  useEffect(() => {
    // clientSocket.on("receive_score", (data) => {

    //   scoreArray.push(data)
    // });

    clientSocket.on("receive_word", (data) => {
      setWordX(data[0]);
    });
    clientSocket.on("receive_definition", (data) => {
      setDefinitionX(data);
    });

    clientSocket.on("receive_defArray", (data) => {
      if (data && data.length) {
        setDater(data);
      }
    });
  }, [clientSocket]);

  return (
    <Card className="main">
      {/* <Typography >Let's BALDERDASH!!!</Typography> */}
      <Card className="playerInfo">
        {/* <Typography
          className="playerName"
          color="secondary"
          sx={{ fontSize: 30, textDecoration: "underline" }}
        >
          Player:
          <Typography
            sx={{ fontSize: 50, fontWeight: "bold", textDecoration: "none" }}
          >
            {" "}
            
          </Typography>
        </Typography> */}


        <Card className="playerScore" color="secondary">
          <Typography sx={{ fontSize: 30, textDecoration: "underline" }} color="secondary">
            {" "}
            Player:{" "}
          </Typography>
          <Typography sx={{ fontSize: 50, fontWeight: "bold" }} color="secondary">
          {username}
          </Typography>
        </Card>

        <Card className="playerScore" color="secondary">
          <Typography sx={{ fontSize: 30, textDecoration: "underline" }} color="secondary">
            {" "}
            Score{" "}
          </Typography>
          <Typography sx={{ fontSize: 50, fontWeight: "bold" }} color="secondary">
            {score}/{round}
          </Typography>
        </Card>
      </Card>

      <Typography
        className={replyAnimation ? "replyAnimate" : "reply"}
        color="secondary"
      >
        {reply}
      </Typography>

      <Typography
        className={replyAnimationDef ? "replyAnimateDef" : "replyDef"}
        color="secondary"
      >
        {`The definition of ${tempWord} is "${definitionX}"`}
      </Typography>


      <Card className="buttons">
        <Button
          className={!wordX || !wordX.length ? "pulse" : null}
          onClick={() => handleGetWord()}
          sx={{ fontSize: 30 }}
          variant="contained"
        >
          <Typography color={"secondary"} sx={{ fontSize: 30 }}>
            Get Word
          </Typography>
        </Button>
        {/* <Typography color={"secondary"} sx={{ fontSize: 30, fontWeight: "bold" }}>{wordX && wordX.length ? `word: ${wordX}` : ""}</Typography> */}
        <div className="wordBox">
          <Typography
            color={"secondary"}
            sx={{ fontSize: 30, fontWeight: "bold" }}
          >
            {wordX && wordX.length ? `word: ` : ""}
          </Typography>
          <Card id="word" color={"primary"}>
          {wordX && wordX.length ? <Typography
              color={"secondary"}
              sx={{
              height: "20vh",
                fontSize: 75,
                fontWeight: "bold",
                // border: "2px solid green",
                // backgroundColor: "secondary.main",
                
              }}
            >
               {wordX}
            </Typography>
            : ""}
          </Card>
        </div>

        {wordX && wordX.length ? (
          <Button
            className={!defDisplayed.length ? "pulse" : null}
            onClick={() => handleGetDefs()}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
              Get Definition
            </Typography>
          </Button>
        ) : null}

        {/* <h3>{typeof definition === "string" ? definition : " "}</h3>
    { typeof definition === "string" ?  <Button onClick={() => play()}>Play</Button> : null} */}

        <h3>{typeof defDisplayed === "string" ? defDisplayed : " "}</h3>
        {/* { typeof defDisplayed === "string" ?  <Button onClick={() => play()}>Play</Button> : null} */}
        {defDisplayed.length ? (
          <Button
            className="pulse"
            onClick={() => play()}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography color={"secondary"} sx={{ fontSize: 30 }}>
              Play
            </Typography>
          </Button>
        ) : null}
        <div></div>
        <div id="definitions">
          {dater && dater.length
            ? dater.map((def) => {
                return (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ border: "2px solid black" }}
                    onClick={() => handleChooseWord(def)}
                  >
                    {def}
                  </Button>
                );
              })
            : ""}
        </div>
        {scoreArray.map((score) => {
          return (
            <div>
              <h1>User: {score.username}</h1>
              <h1>Score: {score.score}</h1>
            </div>
          );
        })}
      </Card>
    </Card>
  );
};

export default Main;
