import React, { useEffect, useContext } from "react";
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

import Main from "../main/Main";
// import GamePlay from "../gamePlay/GamePlayOLD";
import GamePlay from "../gamePlay/GamePlay";
// SOCKET
import socket from "socket.io-client";
// import { SocketContext } from "../../app/App";
import { SocketContext } from "../../app/SocketProvider";
import { use } from "chai";

// Material UI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();
  const gameId = id;

  const dispatch = useDispatch();
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);

  const userScore = scores.find((score) => score.userId === userId);

  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, []);

  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, [gameId]);

  // Updates scores when
  const reloadScores = () => {
    // dispatch(fetchSingleGame(gameId)).then(()=>{
    //   dispatch(fetchAllGameScores(gameId))
    // })
    dispatch(fetchAllGameScores(gameId));
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

  return (
    <Card >
      <Card id="scores-card">
      <div>
        {userScore && userScore.user ? (
          <div>USER NAME: {userScore.user.username}</div>
        ) : null}
      </div>
      <div>{game.name}</div>
      {game.owner ? <div>Owner: {game.owner.username}</div> : null}

      {/* User Score */}
      {/* probably don't need userScore.score below... see nothing when score is 0??? */}
      {/* {userScore && userScore.score ? ( */}
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
                    <button onClick={() => handleAcceptRequest(score.user.id)}>
                      Accept
                    </button>
                    <button onClick={() => handleDeclineRequest(score.user.id)}>
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
