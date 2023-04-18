import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createGame } from './allGamesSlice'
import { createScore } from '../scores/scoresSlice'

const CreateGame = () => {
    const userId = useSelector((state)=>state.auth.me.id)
    const [gameName, setGameName] = useState("") 
    const [rounds, setRounds] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleCreateGame = (e)=>{
   
  
    e.preventDefault();
    
    dispatch(createGame({userId: userId, name: gameName, rounds: rounds, winner: "null", started: false, complete: false})).then((res)=>{

 dispatch(createScore({score: 0, gameId: res.payload.id, userId: userId}))
    })



    
    navigate("/home")

}

  return (
    <div>
    <div>CreateGame</div>
    <form onSubmit={handleCreateGame}>
  <label>
    Name:
    <input type="text" name="name" value={gameName} onChange={(e)=> setGameName(e.target.value)}/>
  </label>
  <label>
    Rounds:
    <input type="number" name="rounds" value={rounds} onChange={(e)=> setRounds(e.target.value)} />
  </label>
 
  <input type="submit" value="Submit" />
</form>

    </div>
  )
}

export default CreateGame