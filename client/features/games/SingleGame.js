import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectSingleGame, fetchSingleGame } from "./singleGameSlice";
import { editScore } from "../scores/scoresSlice";

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
  const gameId = useParams();

  const dispatch = useDispatch();
  const game = useSelector(selectSingleGame);
  console.log("GAME: ", game);
  useEffect(() => {
    dispatch(fetchSingleGame(gameId.id));
  }, []);

const handleAcceptRequest =(id)=>{
    console.log("IDDDD: ", id)
dispatch(editScore({userId: id, gameId: game.id, accepted: true}))
dispatch(fetchSingleGame(gameId.id))
  }

  return (
    <div>
      <div>{game.name}</div>
      {game.owner ? <div>Owner: {game.owner.username}</div> : null}
      {game.users ? (
        <div>
          Players:{" "}
          {game.users.map((user) => (
            <div>
              {user.username} {user.score.score}
            </div>
          ))}
        </div>
      ) : null}


{/* PLayer Requests */}
{game.ownerId === userId && !game.started ?<div>Player Requests</div> :null}
{game.ownerId === userId && !game.started ?
<div>
{game.users ? (
  <div>
    {game.scores.filter((score)=> !score.accepted)
    
    .map((score) => (
      <div>
        {score.user.username}
        <button onClick={()=>handleAcceptRequest(score.user.id)}>Accept</button>
        <button>Decline</button>
      </div>
    ))}
  </div>
) : null}
</div>



:null}

    </div>
  );
};

export default SingleGame;
