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
  useEffect(()=>{
    localStorage.setItem(`${username}`, 0)
  },[])
  // console.log("This is the USER NAME: ", username)

  // SOCKET
  // socket.emit('word', word)
  const definition = useSelector(selectDefinition);

  useEffect(()=>{
    setDefDisplayed(definition)
  },[definition])
  console.log("DEF : ", definition)
const [defDisplayed, setDefDisplayed] = useState("") 
console.log("DEF DISPLAYED: ", defDisplayed)
  const [defArray, setDefArray] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [reply, setReply] = useState("");
  // console.log("DEFINTTT: ", definition)
  const [wordX, setWordX] = useState([]);
console.log("WORD X: ", wordX)

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

  useEffect(() => {}, [handleGetFakeDefinitions]);

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
  // console.log("TYPE OF FINAL RAARRRR", typeof finalArr);
  // console.log(" FINAL RAARRRR", finalArr);
  const play = () => {

    let allDefs = Object.values(fakeDefinitions);

    let radnomNum = Math.floor(Math.random() * allDefs.length);

    allDefs.splice(radnomNum, 0, definition);
    setDefArray(allDefs);
    dispatch(clearFakeDefs());
  };

  const handleChooseWord = (def) => {
    allDefs = [];
    setWordX([])
    setDefArray([]);
    setDater([])
    setDefDisplayed("")
    setRound(round + 1);
    setReply("CORRECT!");
    def === definitionX
      ? setScore(score + 1)
      : setReply(`Wrongo! The definition of ${wordX} is "${definitionX}"`);
  };

  // SOCKET
  // const clientSocket = socket(window.location.origin);
  const clientSocket = socket.connect('http://localhost:8080');


  useEffect(()=>{
    const scoreX = localStorage.getItem(`${username}`)
    localStorage.setItem(`${username}`, Number(scoreX) + 1)
  }, [score])


  useEffect(()=>{
    clientSocket.emit("send_score", {score : score, username: username});
  }, [round])

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



  useEffect(()=>{
    clientSocket.on("receive_score", (data) => {
        // console.log("DATA from recevie score: ", data)
        scoreArray.push(data)
      });
  },[score])

let scoreArray = []
// console.log("SCORE ARRAY: ", scoreArray)
  useEffect(() => {

  
    // clientSocket.on("receive_score", (data) => {
    //   console.log("DATA from recevie score: ", data)
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
      <Typography >Let's BALDERDASH!!!</Typography>
      <h1>
        Player: {username}
      </h1>
      <h1>
        Score: {score}/{round}
      </h1>
      <h1>{reply}</h1>
      <Button  className={!wordX || !wordX.length  ? "pulse": null} 
      
      onClick={() => handleGetWord()}  sx={{ fontSize: 30 }}>Get Word</Button>
      <h2>{wordX ? wordX : ""}</h2>
     {wordX && wordX.length ? <Button className={!defDisplayed.length   ? "pulse": null}  onClick={() => handleGetDefs()} sx={{ fontSize: 30 }}>Get Definition</Button> : null}

      {/* <h3>{typeof definition === "string" ? definition : " "}</h3>
    { typeof definition === "string" ?  <Button onClick={() => play()}>Play</Button> : null} */}

    <h3>{typeof defDisplayed === "string" ? defDisplayed : " "}</h3>
    {/* { typeof defDisplayed === "string" ?  <Button onClick={() => play()}>Play</Button> : null} */}
    { defDisplayed.length ?  <Button  className="pulse" onClick={() => play()}sx={{ fontSize: 30 }}>Play</Button> : null}
      <div></div>
      <div id="definitions">
        {dater && dater.length
          ? dater.map((def) => {
              return (
                <Button  variant="contained" size="large" sx={{ border: "2px solid black" }} onClick={() => handleChooseWord(def)}>{def}</Button>
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
  );
};

export default Main;
