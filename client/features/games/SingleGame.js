// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import { selectSingleGame, fetchSingleGame } from "./singleGameSlice";
// import {
//   fetchAllScores,
//   selectAllScores,
//   fetchAllGameScores,
//   editScore,
//   deleteScore,
//   createScore
// } from "../scores/scoresSlice";

// const SingleGame = () => {
//   // put user ID in props????
//   const userId = useSelector((state) => state.auth.me.id);
//   const { id } = useParams();
//   const gameId = id;

//   const dispatch = useDispatch();
//   const game = useSelector(selectSingleGame);
//   const scores = useSelector(selectAllScores);
//   const userScore = scores.find(score=>score.userId === userId)
//   console.log("USER SCORE: ", userScore)

//   useEffect(() => {
//     dispatch(fetchSingleGame(gameId));
//     // dispatch(fetchAllScores())
//     dispatch(fetchAllGameScores(gameId));
//   }, []);

//   const handleAcceptRequest = (id) => {
//     console.log("IDDDD: ", id);
//     dispatch(editScore({ userId: id, gameId: game.id, accepted: true }));
//     dispatch(fetchSingleGame(gameId));
//     dispatch(fetchAllGameScores(gameId));
//   };
//   const handleDeclineRequest = (id) => {
//     console.log("DECLINE: ", id);
//     dispatch(deleteScore({ userId: id, gameId: game.id }));
//     dispatch(fetchSingleGame(gameId));
//     dispatch(fetchAllGameScores(gameId));
//   };

//   const handleAskJoin = ()=>{
//     dispatch(
//       createScore({ score: 0, accepted: false, gameId: gameId, userId: userId })
//     )
//   }

//   return (
//     <div>
//       {/* USERSORE ERROR */}
//       <div>{userScore && userScore.user ? <div>USER NAMEEEEEEEE{userScore.user.username}</div>: null}</div>
//       <div>{game.name}</div>
//       {game.owner ? <div>Owner: {game.owner.username}</div> : null}

// {/* User Score */}
// {/* USERSORE ERROR */}
// {userScore && userScore.user ? <div> Your Score {userScore.user.username}</div> : null}
//       {/* Players and Score */}
//       {scores ? (
//         <div>
//           Playffers:{" "}
//           {scores
//             .filter((score) => score.accepted && score.userId !== userId)
//             .map((user) => (
//               <div>
//                 {" "}
//                 {user.user ? (
//                   <div>
//                     {user.user.username} {user.score}
//                {user.user.id !== userId ? <button onClick={() => handleDeclineRequest(user.user.id)}>
//                       Remove Player
//                     </button>:null}
//                   </div>
//                 ) : null}
//               </div>
//             ))}
//         </div>
//       ) : null}

//       {/*IF GAME OWNER and Game NOT STARTED: Player Requests */}
//       {game.ownerId === userId && !game.started ? (
//         <div>Player Requests</div>
//       ) : null}

//       {game.ownerId === userId && !game.started ? (
//         <div>
//           {scores ? (
//             <div>
//               {scores
//                 .filter((score) => !score.accepted)

//                 .map((score) => (
//                   <div>
//                     {score.user.username}
//                     <button onClick={() => handleAcceptRequest(score.user.id)}>
//                       Accept
//                     </button>
//                     <button onClick={() => handleDeclineRequest(score.user.id)}>
//                       Decline
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           ) : null}
//         </div>
//       ) : null}

//       {/* IF NOT GAME OWNER  and Game NOT STARTED: REQUEST TO JOIN*/}
// {game.ownerId !== userId && !game.started && !userScore?

// // ADD additional conditional to determine if request already sent
// // Should make singleScore for user!!!! check for that to determing if can send

// <button onClick={handleAskJoin} >Ask to join this game</button>

// :null}

//     </div>
//   );
// };

// export default SingleGame;

import React, { useEffect } from "react";
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

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();
  const gameId = id;

  const dispatch = useDispatch();
  const game = useSelector(selectSingleGame);
  const scores = useSelector(selectAllScores);
  console.log("SCORES: ", scores)
  const userScore = scores.find((score) => score.userId === userId);




  useEffect(() => {
    dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllScores())
    dispatch(fetchAllGameScores(gameId));
  }, []);

  // WHEN ACCEPT HAVE TO EDIT THE GAME AND THE SCORE>>>> coudl get response from game edit to edit score..
  const handleAcceptRequest = (id) => {
    console.log("IDDDD: ", id);
 dispatch(editGame({id: game.id, numPlayers: (game.numPlayers + 1 )})).then((res)=>{
console.log("RESSSSSSS", res)
 dispatch(editScore({ userId: id,turnNum: res.payload.numPlayers, gameId: game.id, accepted: true }));
 }).then(()=>{
  dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
 })
    // dispatch(editScore({ userId: id,turnNum: (game.numPlayers + 1), gameId: game.id, accepted: true }));
    
    // dispatch(fetchSingleGame(gameId));
    // dispatch(fetchAllGameScores(gameId));

  };
  // DECLINE REQUEST TO PLAY
  const handleDeclineRequest = (id) => {
    console.log("DECLINE: ", id);
    dispatch(deleteScore({ userId: id, gameId: game.id }));
    dispatch(fetchSingleGame(gameId));
    dispatch(fetchAllGameScores(gameId));
  };

//  ASK TO JOIN GAME 
  const handleAskJoin = () => {
    dispatch(
      createScore({ score: 0, accepted: false, turn: false, turnNum: null, gameId: gameId, userId: userId })
    );
  };

  // START GAME
  const handleStartGame = ()=>{
    dispatch(editGame({id: game.id, started: true})).then(()=>{
      dispatch(fetchSingleGame(gameId))
    })
  }

  return (
    <div>
      <div>
        {userScore && userScore.user ? (
          <div>USER NAMEEEEEEEE{userScore.user.username}</div>
        ) : null}
      </div>
      <div>{game.name}</div>
      {game.owner ? <div>Owner: {game.owner.username}</div> : null}

      {/* User Score */}
      {userScore && userScore.user ? (
        <div> Your Score {userScore.user.username}</div>
      ) : null}

      {/* Players and Score */}
      {scores  ? (
        <div>
          Playffers:{" "}
          {scores
            .filter((score) => score.accepted && score.userId !== userId)
            .map((user) => (
              <div>
                {" "}
                {user.user ? (
                  <div>
                    {user.user.username} {user.score}
                    {/* Dont let non owner */}
                    {user.user.id !== userId  && userId === game.ownerId && game.started === false? (
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
{game.ownerId === userId &&  game.numPlayers > 1 && game.started === false?
<button onClick={handleStartGame}>Start Game</button>
: null}
      

      {/* GAME PLAY */}
      { (game.started === true && game.ownerId === userId) ||(game.started === true && userScore) ?
<div>Dis where the game would be</div>
      :null}
    </div>
  );
};

export default SingleGame;
