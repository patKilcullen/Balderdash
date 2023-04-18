import React, {useState} from 'react'
import { useDispatch } from 'react-redux'


import { createGame } from './allGamesSlice'

const CreateGame = () => {
    const [gameName, setGameName] = useState("") 
    const [rounds, setRounds] = useState(0)

    const dispatch = useDispatch()

const handleCreateGame = (e)=>{
    console.log("YOOOOO")
  
    e.preventDefault();
    // dispatch(createGame({name, rounds, winner, started, complete}))
    dispatch(createGame({name: "assFART", rounds: 20, winner : "null", started: false, complete: false}))
}

  return (
    <div>
    <div>CreateGame</div>
    <form onSubmit={handleCreateGame}>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
 
  <input type="submit" value="Submit" />
</form>

    </div>
  )
}

export default CreateGame