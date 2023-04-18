import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link} from 'react-router-dom'


import { fetchAllGames, selectAllGames } from './allGamesSlice'

import CreateGame from './CreateGame';
import SingleGame from './SingleGame';

import socket from "socket.io-client";

const AllGames = () => {
const dispatch = useDispatch()
const games = useSelector(selectAllGames)

const [gamesX, setGamesX] = useState([]) 


useEffect(()=>{
dispatch(fetchAllGames())

},[])

 // SOCKET
//  as in Main.js,  useEffect (with games in dep array???) to emit games or game, add it to server, then send
// and also include useEffect with clientSock in dep arry, receive games, then??? useDispatch(fetchAllGames)??? or just selectGames???

const clientSocket = socket.connect("http://localhost:8080");

useEffect(() => {
    clientSocket.emit("send_new_game", games);
  }, [games]);

clientSocket.on("receive_new_game", (data) => {
    console.log("HI FROM RECEIVE NEW RAMCE", data)
    setGamesX(data)
    
})
  return (
    <div>
    <div>All Games</div>
{gamesX && gamesX.length ? 
gamesX.map((game)=> (
   <Link to={`/games/${game.id}`}> <div>{game.id} :   {game.name}</div></Link>
))

: null}



  <Link to="/create-game"> <button >Create a NEW GAME</button></Link> 
    

    </div>
  )
}

export default AllGames