import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createGame } from "./allGamesSlice";
import { createScore } from "../scores/scoresSlice";

const CreateGame = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const [gameName, setGameName] = useState("");
  const [rounds, setRounds] = useState(1);
  const [error, setError] = useState("")


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateGame = (e) => {
    e.preventDefault();

    !isNaN(rounds) && rounds > 0 ?
    dispatch(
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
        turn: 1 
      })
    ).then((res) => {
      console.log("RES: ", res)
      dispatch(
        createScore({ score: 0, accepted: true,turn: true, turnNum: 1, gameId: res.payload.id, userId: userId })
      );
    }).then(()=>{
      navigate("/home")
    })
   : setError("Rounds must be a postive integer");
  }
  console.log("Error Message: ", error)

  return (
    <div>
      <div>CreateGame</div>
      <form onSubmit={handleCreateGame}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        </label>
        <label>
          Rounds:
          <input
            type="number"
            name="rounds"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
      
      {error ?
   
      <div>{error}</div> 
      : null}
    </div>
  );
};

export default CreateGame;
