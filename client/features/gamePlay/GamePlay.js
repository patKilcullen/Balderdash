import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

// SLICES/STATE REDUCERS, ETC.
import {
  getWord,
  setWordState,
  getDefinition,
  getFakeWords,
  clearFakeDefs,
  clearFakeWords,
  addDefinition,
  clearTempScoreCardMessages,
} from "./gamePlaySlice";
import { addNewWord } from "../words/wordsSlice";
import { selectMe } from "../auth/authSlice";
import { selectSingleGame } from "../games/singleGameSlice";

// COMPONENTS
import Timer from "./Timer";
import CardFront from "../cards/CardFront";

// SOCKET
import { SocketContext } from "../../app/SocketProvider";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { minWidth } from "@mui/system";

const GamePlay = ({ userId, game, userScore, reloadScores, checkIfTied }) => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  // SOCKET
  const clientSocket = useContext(SocketContext);

  const username = me.username;
  const gameName = game.name;

  // COMPONENT STATE
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [timer, setTimer] = useState(false);
  const [choseWord, setChoseWord] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("");
  const [playerTurnName, setPlayerTurnName] = useState("");
  const [flip, setFlip] = useState(false);

  // Finds the player who turnNum === game.turn, sets it to playerTurnName
  // when the game reloads to check for new turn
  useEffect(() => {
    game && game.scores
      ? setPlayerTurn(
          game.scores.filter((score) => score.turnNum === game.turn)
        )
      : null;
    playerTurn ? setPlayerTurnName(playerTurn[0].user.username) : null;
  }, []);

  // GET WORD:  first clears defs from last round then gets word from API, sets it in state,
  // then gets the definition throug API then sets that in state for player whose turn it is,
  // and then add it the the definition array with the key "real" to distinguish it from others
  const [moveOffScreen, setMoveOffScreen] = useState(false);
  const [flipSide, setFlipSide] = useState("back");
  const handleGetWord = () => {


    // CARD FLIPPING INFO
    // If there is already a word(card already flipped over, the card leaves the screen, comes back, then flip over)
    word ? setMoveOffScreen(true) : null;
    word ? setFlip(false): null
    setTimeout(
      () => {
        word ? setMoveOffScreen(false) : null;
        setFlipSide("back");

        setTimeout(
          () => {
            setFlip(true);
            setFlipSide("front");
          },
          word ? 500 : 0
        );
      },
      word ? 1000 : 0
    );
    // CARD FLIPPING INFO



    dispatch(clearFakeDefs());
    dispatch(clearTempScoreCardMessages());
    dispatch(getWord()).then((res) => {
      setWord(res.payload[0]);
      dispatch(getDefinition(res.payload[0])).then((res) => {
        setDefinition(res.payload);
        dispatch(addDefinition({ real: res.payload }));
        //  setFlip(true);
        //  setFlipSide("front");
      });
    });
  };





  // CHOOSE WORD: first gets fake words for fake definition, then emits the word,
  // socket room name (as gamename), and playerTurn(as their username)
  // to other users/ then starts Timer component by setting state to true
  //  and then choseWord to true to hide button/keep user from choosing again
  const handleChooseWord = () => {
    handleGetFakeWords();
    clientSocket.emit("send_word", {
      word: word,
      room: gameName,
      playerTurnName: username,
    });
    setTimer(true);
    setChoseWord(true);
  };

  const handleAddNewWord = () => {
    dispatch(addNewWord({ word: word, definition: definition }));
  };

  // GET FAKE WORDS   called in handleChooseWord function,
  // clears fake words from last roung, then gets 5 fake words
  const handleGetFakeWords = () => {
    dispatch(clearFakeWords());
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };

  // This useEffect dependency(including "game") array ensures sockets dont render on the wrong game for client who
  // belong to(or have visited) other games
  useEffect(() => {
    // RECEIVE WORD from socket first, if it isn't players turn, update playerTurnNAme,
    // then, if they're in the right room, add the word to state, set flip to truand and flipside to "front""
    clientSocket.on("receive_word", ({ word, room, playerTurnName }) => {
      
      playerTurnName !== username && room === gameName
        ? dispatch(setWordState(word))
        : null;
      playerTurnName !== username ? setPlayerTurnName(playerTurnName) : null;

      playerTurnName !== username && room === gameName
        ? setWord(word)
        : setWord("");

  
      playerTurnName !== username && room === gameName
        ? setFlip(true)
        : setFlip(false);
           playerTurnName !== username && room === gameName
             ? setFlipSide("front")
             : null;
        
    });

    // RECEIVE START COUNTDOWN players receive this from player whose turn it is when
    // that player start Timer countdown then automatically start Timer contdown on their end
    clientSocket.on("receive_start_countdown", (room) => {
      room === gameName ? setTimer(true) : setTimer(false);
    });

    // RECEIVER PLAYERS FAKE DEFINITIONS if players turn, recieve other players fake definitions
    // and add the to fake def array with key associated with player id so they can later be awarded point
    clientSocket.on(
      "receive_player_fake_def",
      ({ playerDef, room, userId, playerTurnName }) => {
        let playerId = userId;
        room === gameName && playerTurnName === username
          ? dispatch(addDefinition({ [playerId]: playerDef }))
          : console.log(
              "ERROR: Failed to add player definition: ",
              playerDef,
              room,
              userId,
              playerTurnName
            );
      }
    );
  }, [clientSocket, game]);



  // This set the flipCArd funciton right when the game changes turns
  useEffect(()=>{
!word ? setFlipSide("back") : null
  },[reloadScores])

  return (
    <Card
      className="main "
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
        height: "100vh",
        gap: "10px",
      }}
    >
      <Card className="buttons " sx={{ boxShadow: "none" }}>
        {/* GET WORD BUTTON -  only visible if it is players turn*/}
        {game && userScore && game.turn === userScore.turnNum ? (
          <Button
            onClick={handleGetWord}
            sx={{ fontSize: 30 }}
            variant="contained"
          >
            <Typography
              className={!word || !word.length ? "pulse" : null}
              color={"secondary"}
              sx={{ fontSize: 30 }}
            >
              Get Word
            </Typography>
          </Button>
        ) : null}

        {/* MAIN CARD COMPONENT */}
        <Card>
          <CardFront
            notReverse={true}
            side={"back"}
            // bottomCard={false}
          ></CardFront>

          {/* CARD FLIPPING INFO */}
          <CardFront
            moveOffScreen={moveOffScreen}
            flip={!flip}
            side={"back"}
            bottomCard={
              game && userScore && game.turn === userScore.turnNum
                ? false
                : true
            }
          ></CardFront>
          <CardFront
     
            moveOffScreen={moveOffScreen}
            checkIfTied={checkIfTied}
            top={word}
            bottom={definition}
            // side={word || (word.length && definition) ? "front" : "back"}
            side={flipSide}
            flip={flip}
            timer={timer}
            game={game}
            username={username}
            userId={userId}
            userScore={userScore}
            gameName={gameName}
            gameId={game.id}
            playerTurnName={playerTurnName}
            definition={definition}
            reloadScores={reloadScores}
            setDefinition={setDefinition}
            setWord={setWord}
            setTimer={setTimer}
            setChoseWord={setChoseWord}
            style={{ border: "2px solid green" }}
          />
        </Card>
      </Card>

      {/* CHOOSE WORD BUTON  only avaible if they got word/definition and havent chosen word yet*/}
      {definition && !choseWord ? (
        <Button
          className={"pulse"}
          onClick={() => handleChooseWord()}
          sx={{ fontSize: 30, marginTop: "15px" }}
          variant="contained"
        >
          <Typography color={"secondary"} sx={{ fontSize: 30 }}>
            Choose Word
          </Typography>
        </Button>
      ) : null}

      {/* ADD NEW WORD/DEFINITION TO DATABASE */}
      {definition && !choseWord ? (
        <Button
          className={"pulse"}
          onClick={() => handleAddNewWord()}
          sx={{ fontSize: 30, marginTop: "15px" }}
          variant="contained"
        >
          <Typography color={"secondary"} sx={{ fontSize: 30 }}>
            Add word to database
          </Typography>
        </Button>
      ) : null}
    </Card>
  );
};

export default GamePlay;
