import React, { useEffect, useState, useContext } from "react";
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
} from "./gamePlaySlice";
import { selectMe } from "../auth/authSlice";

// SOCKET
// could/should this be imported from app/socket.js??????
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const GamePlay = ({userId, game, userScore}) => {
  const dispatch = useDispatch();
  const word = useSelector(selectWord);
  const me = useSelector(selectMe);
  const username = me.username;



  const [tempWord, setTempWord] = useState("")
  const [displayDef, setDisplayDef] = useState(false)
  const [defDisplayed, setDefDisplayed] = useState("");
  const [defArray, setDefArray] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [reply, setReply] = useState("");
  const [wordX, setWordX] = useState([]);
  const [replyAnimation, setReplyAnimation] = useState(false);
  const [replyAnimationDef, setReplyAnimationDef] = useState(false);
  const [dater, setDater] = useState([]);
  const [definitionX, setDefinitionX] = useState("");

//   NEW
const [playerDef, setPlayerDef] = useState("")







  
  const definition = useSelector(selectDefinition);

  useEffect(() => {
    setDefDisplayed(definition);
  }, [definition]);

 
  


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





//   const handleGetWord = () => {
//     dispatch(getWord()).then(() => {
//       handleGetFakeWords();
//       // setTempWord(word)
//       setDisplayDef(true)
//     });
//   };

//   const handleGetFakeWords = () => {
//     dispatch(clearFakeWords());
//     allDefs = [];
//     let count = 0;
//     while (count < 5) {
//       dispatch(getFakeWords());
//       count++;
//     }
//   };
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
  
    setTempWord(wordX)
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

  };

  // SOCKET
  // const clientSocket = socket(window.location.origin);
  // const clientSocket = socket.connect("http://localhost:8080");
  const clientSocket = useContext(SocketContext)

// NEW!!!!!
const [newWord, setNewWord] = useState("")
//   const handleGetWord = () => {
//     dispatch(getWord()).then(() => {
//       handleGetFakeWords();
//       // setTempWord(word)
//       setDisplayDef(true)
//     });
//   };

// Right now, it gets the word and puts it in state, 
const handleGetWord = () => {

    dispatch(getWord()).then((res) => {

console.log("WORD: ",res.payload[0])
console.log("GAME ID: ",game.id)

clientSocket.emit("send-user-name", {roomId: game.id, username: res.payload[0]})
// clientSocket.emit('send_word', (res.payload, game.id))
clientSocket.emit('send_word', ({word: res.payload[0],room: game.id}))

setNewWord(res.payload)
      handleGetFakeWords();
      // setTempWord(word)
      setDisplayDef(true)
    });
  };


  const handleGetFakeWords = () => {
    dispatch(clearFakeWords());
    allDefs = [];
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };

//  useEffect(() => {
//     game && userScore && game.turn === userScore.turnNum  ?
//     clientSocket.emit(`send_word`, word)
//     : null
//   }, [word]);




//   useEffect(() => {
//     clientSocket.emit("send_score", { score: score, username: username });
//   }, [round]);



//   useEffect(() => {
//     clientSocket.emit("send_word", word);
//   }, [word]);

 
//   useEffect(() => {
//     clientSocket.emit("send_definition", definition);
//   }, [definition]);

//   useEffect(() => {
//     clientSocket.emit("send_defArray", defArray);
//   }, [defArray]);

  

//   useEffect(() => {
//     clientSocket.on("receive_score", (data) => {
//       scoreArray.push(data);
//     });
//   }, [score]);

//   let scoreArray = [];


  // USER ARRAY
// 
// const userArray = []
// let newUserArray = []

// useEffect(()=>{
// console.log("usrARRAY: ", userArray)

// }, [userArray])


// SOCKET - Receive info from client socket
  useEffect(() => {
    // clientSocket.on("receive_score", (data) => {

    //   userArray.push([data])
    //   // userArray.push({username: data.username, score: data.score})


    // });

    // clientSocket.on("receive_word", (data) => {
    //     userScore.gameId === game.id  ?
    //   setWordX(data[0])
    //  : null
    // });

    // clientSocket.on("receive_new_word", (data) => {
        
    //   console.log("GOT IT BABY: ", data)
    
    // });

    clientSocket.on("assfuck", (data) => {
      console.log("assfuck", data)
       });

    clientSocket.on("receive_word", (data) => {
     console.log("RECEIVE WORD", data)
      });

    // clientSocket.on('receive_new_word', (word) => {
    //     console.log(`Received the new word "${word}"`);
    //     // do something with the new word, such as displaying it in the UI
    //   });


    // clientSocket.on('receive_new_word', ({ room, word }) => {
    //     if (room === game.id) {
    //       console.log(`Received the word "${word}" in the "${room}" room`);
    //       // do something with the word message, such as displaying it in the UI
    //     }
    //   });


    

    // clientSocket.on("receive_defArray", (data) => {
    //   if (data && data.length) {
    //     setDater(data);
    //   }
    // });
  }, [clientSocket]);




  const handleEnterFakeDef = ()=>{
    console.log("AAAAAA")
  }



  console.log("GAME ID", game.id)


const handleJoinRoom = ()=>{

  console.log("jjGAME ID IN handle join roommm: ", game.id)
  console.log("typeof  handle join roommm: ",typeof game.id)
clientSocket.emit("join-da-room", game.id)

}

const handleSendUsername = ()=>{
  clientSocket.emit("send-user-name", {roomId: game.id, username: username})
}

  return (
    <Card className="main " sx={{boxShadow: "none",overflow: "visible" }}>

      <Card className="playerInfo" sx={{boxShadow: "none"}}>
     


        <Card className="playerScore" color="secondary" sx={{boxShadow: "none"}}>
         
          <Typography sx={{ fontSize: 50, fontWeight: "bold" }} color="secondary">
          {username}
          </Typography>
        </Card>

        <Card className="playerScore" color="secondary"sx={{boxShadow: "none"}}>
        
     
        </Card>
      </Card>

      <Typography
        className={replyAnimation ? "replyAnimate" : "reply"}
        color="secondary"
        sx={{boxShadow: "none", overflow: "visible"}}
      >
        {reply}
      </Typography>

     

      <Typography
        className={replyAnimationDef ? "replyAnimateDef" : "replyDef"}
        color="secondary"
        sx={{fontSize: 40, boxShadow: "none"}}
      >
        {`The definition of ${tempWord} is "${definitionX}"`}
      </Typography>

      
      
     

{/* BUTTONS */}
      <Card className="buttons " sx={{boxShadow: "none"}}>


{/* GET WORD BUTTON -  only visible if it is userScore's turn*/}
        {game && userScore && game.turn === userScore.turnNum ?
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
:null}


{/* SHOW THIS AFTER PLAYER TUNR PICS WORD!!!!!!!! */}
{/* ENTER PLAYER DEFINTION fof non-turn players */}
{game && userScore && game.turn !== userScore.turnNum ?
<form onSubmit={handleEnterFakeDef}>
        <label>
          Enter you fake Def here:
          <input
            type="textarea"
            name="name"
            value={playerDef}
             onChange={(e) => setPlayerDef(e.target.value)}
          />
        </label>
        
        <input type="submit" value="Submit" />
      </form>
      :null}



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
  
              }}
            >
               {wordX}
            </Typography>
            : ""}
          </Card>
        </div>



        {wordX && wordX.length && displayDef ? (
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
    
      </Card>
      <button onClick={handleJoinRoom}>join ROONM</button>
      <button onClick={handleSendUsername}>send user.id</button>
    </Card>
  );
};


export default GamePlay;