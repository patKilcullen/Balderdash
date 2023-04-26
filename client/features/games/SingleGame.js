import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectSingleGame, fetchSingleGame } from "./singleGameSlice";
import { fetchAllScores, selectAllScores, fetchAllGameScores, editScore, deleteScore } from "../scores/scoresSlice";

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
  const {id} = useParams();
const gameId = id


  const dispatch = useDispatch();
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);

  
  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId))
  }, []);

  


  

const handleAcceptRequest =(id)=>{
    console.log("IDDDD: ", id)
dispatch(editScore({userId: id, gameId: game.id, accepted: true}))
dispatch(fetchSingleGame(gameId))
dispatch(fetchAllGameScores(gameId))
  }
  const handleDeclineRequest =(id)=>{
     console.log("DECLINE: ", id)
dispatch(deleteScore({userId: id, gameId: game.id}))
 dispatch(fetchSingleGame(gameId))
  }

  return (
    <div>
      <div>{game.name}</div>
      {game.owner ? <div>Owner: {game.owner.username}</div> : null}

      {/* Players and Score */}
      {/* {game.users ? (
        <div>
          Players:{" "}
          {game.users.map((user) => (
            <div>
              {user.username} {user.score.score}
            </div>
          ))}
        </div>
      ) : null} */}


      {scores  ? (
        <div>
          Playffers:{" "}
          {scores.filter(score=> score.accepted)
          .map((user) => (
           <div> {user.user ?
            <div>
              {user.user.username} {user.score}
            </div>
            : null}
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
        <button onClick={()=>handleDeclineRequest(score.user.id)}>Decline</button>
      </div>
    ))}
  </div>
) : null}
</div>



:null}


{/* {game.ownerId === userId && !game.started ?
<div>
{scores ? (
  <div>
    {game.scores.filter((score)=> !score.accepted)
    
    .map((score) => (
      <div>
        {score.user.username}
        <button onClick={()=>handleAcceptRequest(score.user.id)}>Accept</button>
        <button onClick={()=>handleDeclineRequest(score.user.id)}>Decline</button>
      </div>
    ))}
  </div>
) : null}
</div>
:null} */}

    </div>
  );
};

export default SingleGame;
