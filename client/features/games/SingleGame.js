import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectSingleGame,fetchSingleGame } from './singleGameSlice'

const SingleGame = () => {
  // put user ID in props????
  const userId = useSelector((state) => state.auth.me.id);
const gameId = useParams()

const dispatch = useDispatch()
const game = useSelector(selectSingleGame)
console.log("GAME: ",game)
useEffect(()=>{
dispatch(fetchSingleGame(gameId.id))
}, [])



  return (
    <div>
    <div>{game.name}</div>
   {game.owner ? <div>Owner: {game.owner.username}</div>:null}
   {game.users ? <div>Players: {game.users.map((user)=>(
    <div>{user.username} {user.score.score}</div>
   ))}</div>:null}

{game.ownerId === userId ? 
// Should filet there scores here or in a think or on backend??
<div>{game.users ? <div>Players Requests: {game.users.map((user)=>(
    <div>{user.username} {user.score.score}</div>
   ))}</div>:null}</div>
:null}



    </div>
  )
}

export default SingleGame