import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectSingleGame, fetchSingleGame, editGame } from "./singleGameSlice";
import {
  fetchAllScores,
  selectAllScores,
  fetchAllGameScores,
  editScore,
  deleteScore,
  createScore,
} from "../scores/scoresSlice";

import {
  selectScoreCardMessages,
  clearScoreCardMessages,
} from "../gamePlay/gamePlaySlice";

import Main from "../main/Main";
// import GamePlay from "../gamePlay/GamePlayOLD";
import GamePlay from "../gamePlay/GamePlay";
// SOCKET
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";
import { use } from "chai";

import ScoreCard from "../scores/ScoreCard";

// Material UI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();
  const gameId = id;
  const username = useSelector((state) => state.auth.me.username);

  const dispatch = useDispatch();
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);

  const userScore = scores.find((score) => score.userId === userId);

// Could use res of fetchSingleGame to get scores through eager loading and set them
// to state instead of fetchAllGameScores and score = useSelector(selectAllScores)
// not such which would be more efficent or if it makes a diference
const [scoresX, setScoresX] = useState('')
  useEffect(() => {
    dispatch(fetchSingleGame(gameId)).then((res)=>{
console.log("RES HETER: ", res)
setScoresX(res.payload.scores)
    })
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, []);
  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, [gameId]);

  const [showScoreCard, setShowScoreCard] = useState(false);
  // Updates scores when
  const reloadScores = () => {
  
    dispatch(fetchAllGameScores(gameId));
    setTimeout(() => {
    dispatch(clearScoreCardMessages());


      setShowScoreCard(false);
    }, 5000);
   setShowScoreCard(true);
  };

  // SOCKET
  //  const clientSocket = socket.connect("http://localhost:8080");
  const clientSocket = useContext(SocketContext);

  // WHEN ACCEPT HAVE TO EDIT THE GAME AND THE SCORE>>>> coudl get response from game edit to edit score..
  const handleAcceptRequest = (id) => {
    dispatch(editGame({ id: game.id, numPlayers: game.numPlayers + 1 }))
      .then((res) => {
        dispatch(
          editScore({
            userId: id,
            turnNum: res.payload.numPlayers,
            gameId: game.id,
            accepted: true,
          })
        );
      })
      .then(() => {
        dispatch(fetchSingleGame(gameId));
        dispatch(fetchAllGameScores(gameId));
      });
  };
  // DECLINE REQUEST TO PLAY
  const handleDeclineRequest = (id) => {
    dispatch(deleteScore({ userId: id, gameId: game.id }));
    dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
  };

  //  ASK TO JOIN GAME
  const handleAskJoin = () => {
    dispatch(
      createScore({
        score: 0,
        accepted: false,
        turn: false,
        turnNum: null,
        gameId: gameId,
        userId: userId,
      })
    );
  };

  // START GAME
  const handleStartGame = () => {
    dispatch(editGame({ id: game.id, started: true })).then(() => {
      dispatch(fetchSingleGame(gameId));
    });
  };

  const [scoreCard, setScoreCard] = useState("");
  const scoreCardTurn = useSelector(selectScoreCardMessages);

  useEffect(() => {
    setScoreCard(scoreCardTurn);
  }, [scoreCardTurn]);

  // SHOULD THIS CHECK IF ITS THE RIGHT GAME?????????
  useEffect(() => {
    clientSocket.on("receive_score_card", ({ gameName, scoreCardMessages }) => {
      //  setScoreCard(scoreCardMessages)

      setScoreCard(scoreCardMessages);
    });
  }, [clientSocket]);


// console.log("GAME NAME IN SINGL GMAE: ", game.name)
// USER LEAVES SOCKET ROOM WHEN SINGLe GAME UNMOUNTS
useEffect(()=>{



    clientSocket.emit("join_room", { room: game.name, userName: username })
  
  return () => {
    // Leave the room
    clientSocket.emit('leave_room', { room: game.name });
    // Disconnect the socket
    // clientSocket.disconnect();
  };
},[game])

  return (
    <Card>
      {/* SHOWSCORE CARD MAY BE UNECESSARY */}
      {showScoreCard ? <ScoreCard scoreCard={scoreCard} /> : null}
      {/* <ScoreCard scoreCard={scoreCard} />  */}
      <Card id="scores-card">
        <div>
          {userScore && userScore.user ? (
            <div>USER NAME: {userScore.user.username}</div>
          ) : null}
        </div>
        <div>{game.name}</div>
        {game.owner ? <div>Owner: {game.owner.username}</div> : null}

        {/* User Score */}

        {userScore ? (
          // <div> Your Score {userScore.user.username} </div>
          <div> Your Score {userScore.score} </div>
        ) : null}

        {/* Players and Score */}
        {scores ? (
          <div>
            Playffers:{" "}
            {scores
              .filter((score) => score.accepted && score.userId !== userId)
              .map((user) => (
                <div>
                  {" "}
                  {user.user ? (
                    <div>
                      {user.user.username} Score: {user.score}
                      {/* Dont let non owner */}
                      {user.user.id !== userId &&
                      userId === game.ownerId &&
                      game.started === false ? (
                        <button
                          onClick={() => handleDeclineRequest(user.user.id)}
                        >
                          Remove Player
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        ) : null}

        {/*IF GAME OWNER and Game NOT STARTED: Player Requests */}
        {game.ownerId === userId && !game.started ? (
          <div>Player Requests</div>
        ) : null}

        {game.ownerId === userId && !game.started ? (
          <div>
            {scores && scores.length ? (
              <div>
                {scores
                  .filter((score) => !score.accepted)

                  .map((score) => (
                    <div>
                      {score.user.username}
                      <button
                        onClick={() => handleAcceptRequest(score.user.id)}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(score.user.id)}
                      >
                        Decline
                      </button>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* IF NOT GAME OWNER  and Game NOT STARTED: REQUEST TO JOIN*/}
        {game.ownerId !== userId && !game.started && !userScore ? (
          // ADD additional conditional to determine if request already sent
          // Should make singleScore for user!!!! check for that to determing if can send

          <button onClick={handleAskJoin}>Ask to join this game</button>
        ) : null}

        {/* START GAME - If game owner and more than one player*/}
        {game.ownerId === userId &&
        game.numPlayers > 1 &&
        game.started === false ? (
          <button onClick={handleStartGame}>Start Game</button>
        ) : null}
      </Card>

      {/* GAME PLAY */}
      {(game.started === true && game.ownerId === userId) ||
      (game.started === true && userScore) ? (
        <>
          {/* <GamePlay userId={userId} game={game} userScore={userScore} /> */}
          <GamePlay
            userId={userId}
            game={game}
            userScore={userScore}
            reloadScores={reloadScores}
          />
        </>
      ) : null}
    </Card>
  );
};

export default SingleGame;
