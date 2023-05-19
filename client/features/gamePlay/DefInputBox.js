import React, {useState, useContext} from 'react'

import { SocketContext } from "../../app/SocketProvider";

const DefInputBox = ({gameName, userId,playerTurnName}) => {
    const [playerDef, setPlayerDef] = useState("")
    const [seeInput, setSeeInput] = useState(true)

    const clientSocket = useContext(SocketContext);

const handleEnterFakeDef = (e)=>{
e.preventDefault()
clientSocket.emit("send_player_fake_def", {playerDef,room: gameName, userId, playerTurnName})

setSeeInput(false)
setPlayerDef("")
}

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