import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { selectAllScores } from "./scoresSlice";
import { selectSingleGame } from "../games/singleGameSlice";

import { Card, Button, Typography, Divider, Box } from "@mui/material";


import { SocketContext } from "../../app/SocketProvider";

const ScoreCard = ({
  userId,
  userScore,
  game,
  handleAskJoin,
  handleStartGame,
  handleDeclineRequest,
  handleAcceptRequest,
}) => {
  const clientSocket = useContext(SocketContext);

  const scores = useSelector(selectAllScores);

 
  return (
    <Card sx={{ boxShadow: "20", border: "2px solid black" }}>
      <Card
        sx={{
          padding: "10px",
  
          backgroundColor: "#88ebe6",

        }}
      >
        {/* <Card id="scores-card"> */}
        <Card
          id="score-card-header"
          color="seconday"
          sx={{ boxShadow: "20", padding: "10px" }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                gap: "30px",
              }}
            >
              <Typography sx={{}}>game: </Typography>
              <div style={{}}>
                <Typography
                  id="score-card-game-name"
                  color="secondary"
                  style={{ fontWeight: "bold", marginLeft: "20px" }}
                >
                  {game.name}
                </Typography>
                <Divider
                  sx={{
                    border: " 1px solid black",
                    width: "150%",
                    marginLeft: "-35px",
                  }}
                ></Divider>
              </div>
            </div> */}

            <Typography
              id="title"
              color="secondary"
              sx={{ fontWeight: "bold", overflow: "scroll" }}
            >
              {game.name}
            </Typography>
            <Divider
              sx={{
                border: "2px solid #571122",
                width: "95%",
                marginTop: "-15px",
                boxShadow: "1px 1px #558ABB",
              }}
            ></Divider>

            <Box sx={{ display: "flex", width: "100%", marginTop: "20px" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  border: "2px solid #571122",
                  boxShadow: "2px 2px black",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "#e6e8dc",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Typography
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                  >
                    {" "}
                    {userScore ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "30px",
                            textDecoration: "underline",
                          }}
                        >
                          Score:
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: "1px",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            marginLeft: "20px",
                          }}
                        >
                          <div style={{ color: "red", textDecoration: "none" }}>
                            {userScore.score}
                          </div>
                          <div style={{ color: "black", fontSize: "20px" }}>
                           {userScore.score === 1 ? "pt": "pts"}
                          </div>
                        </div>
                      </div>
                    ) : //  <div style={{textDecoration: "underline", width: "100%" ,display: "flex", flexDirection: "column", alignItems: "center"}}>Score: {userScore.score} </div>
                    null}
                  </Typography>
                  <Typography
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                  >
                    {" "}
                    {game && game.rounds && game.roundsLeft ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "30px",
                            textDecoration: "underline",
                          }}
                        >
                          Round:
                        </div>
                        <div style={{ color: "red", textDecoration: "none" }}>
                          {game.rounds + 1 - game.roundsLeft}/{game.rounds}{" "}
                        </div>
                      </div>
                    ) : null}
                  </Typography>
                </Card>
              </Card>

              <Card
                sx={{
                  width: "100%",
                  border: "2px solid #571122",
                  boxShadow: "2px 2px black",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "#e6e8dc",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "scroll",
                  }}
                >
                  <Typography
                    color="secondary"
                    sx={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                    variant="h4"
                  >
                    Players
                  </Typography>
                  {scores ? (
                    <div>
                      {scores
                        .filter(
                          (score) => score.accepted && score.userId !== userId
                        )
                        .map((user) => (
                          <div>
                            {" "}
                            {user.user ? (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "1px",
                                  }}
                                >
                                  <Typography
                                    color="secondary"
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: "25px",
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                    variant="h4"
                                  >
                                    {user.user.username}:{" "}
                                  </Typography>

                                  <Typography
                                    color="secondary"
                                    sx={{
                                      fontWeight: "bold",
                                      color: "red",
                                      width: "100%",
                                    }}
                                    variant="h4"
                                  >
                                    <div
                                      style={{
                                        fontSize: "30px",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "1px",
                                        alignItems: "flex-end",
                                      }}
                                    >
                                      <div> {user.score}</div>
                                      <div
                                        style={{
                                          color: "black",
                                          fontSize: "20px",
                                        }}
                                      >
                                       {user.score === 1 ? "pt": "pts"}
                                      </div>
                                    </div>
                                  </Typography>
                                  {/* {user.user.username}:  
                          {user.score}pts */}
                                </div>
                                {/* Dont let non owner */}
                                {user.user.id !== userId &&
                                userId === game.ownerId &&
                                game.started === false ? (
                                  <button
                                    onClick={() =>
                                      handleDeclineRequest(user.user.id)
                                    }
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
                </Card>
              </Card>
            </Box>

            {/* <Typography>
              {userScore && userScore.user ? (
                <Typography>USER NAME: {userScore.user.username}</Typography>
              ) : null}
            </Typography>
            {game.owner ? <div>Owner: {game.owner.username}</div> : null}
            {userScore ? (
              <div> Your Score {userScore.score} </div>
            ) : null} */}

            {/* {scores ? (
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
            ) : null} */}

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
          </div>
        </Card>
      </Card>
    </Card>
  );
};

export default ScoreCard;
