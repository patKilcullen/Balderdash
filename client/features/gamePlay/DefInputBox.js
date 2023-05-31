import React, {useState, useContext, useEffect} from 'react'

import { SocketContext } from "../../app/SocketProvider";

const DefInputBox = ({game, gameName, userId, playerTurnName}) => {
    const [playerDef, setPlayerDef] = useState("")
    const [seeInput, setSeeInput] = useState(true)

    const clientSocket = useContext(SocketContext);
    


   

const handleEnterFakeDef = (e)=>{
e.preventDefault()
console.log("PLAYER TURN NAME IN DEF INPUT BOX: ", playerDef,gameName, userId, playerTurnName)
console.log(`PLAYER TURN NAME IN DEF INPUT BOX: ,def  ${playerDef},gameName, userId ${userId}, playerTurnName ${playerTurnName}`)

clientSocket.emit("send_player_fake_def", {playerDef,room: gameName, userId, playerTurnName})

setSeeInput(false)
setPlayerDef("")
}

// const [playerTurnNameX, setPlayerTurnName] = useState(playerTurnName)
// useEffect(()=>{
// setPlayerTurnName(playerTurnName)
// }, [playerTurnName])


  return (
    <div>
        {seeInput ? <form onSubmit={handleEnterFakeDef}>
            <label>
              Enter you fake Def here:
              <input
                type="textarea"
                name="name"
                value={playerDef}
                onChange={(e) => setPlayerDef(e.target.value)}
              />
            </label>

            <input type="submit" value="Submit" />
          </form> :null}
    </div>
  )
}

export default DefInputBox