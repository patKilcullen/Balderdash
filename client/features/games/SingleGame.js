import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectSingleGame,fetchSingleGame } from './singleGameSlice'

const SingleGame = () => {
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
   {/* {game.users ? <div>Owner: {game.users.map((user)=>(
    <div>{user.owner.username}</div>
   ))}</div>:null} */}


   {game.users ? <div>Players: {game.users.map((user)=>(
    <div>{user.username}</div>
   ))}</div>:null}
    </div>
  )
}

export default SingleGame