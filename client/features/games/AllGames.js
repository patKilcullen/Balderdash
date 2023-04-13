import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";


import { fetchAllGames, selectAllGames } from './allGamesSlice'


const AllGames = () => {
const dispatch = useDispatch()
const games = useSelector(selectAllGames)

console.log("GAMES: ", games)
useEffect(()=>{
    console.log("HELLLOE")
dispatch(fetchAllGames())
console.log("GAMES 2: ", games)
},[])


  return (
    <div>
    <div>All Games</div>

    <button>Create a NEW GAME</button>

    </div>
  )
}

export default AllGames