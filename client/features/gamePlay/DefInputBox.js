import React, {useState} from 'react'

import { SocketContext } from "../../app/SocketProvider";

const DefInputBox = () => {
    const [playerDef, setPlayerDef] = useState("")

const handleEnterFakeDef = ()=>{

}

  return (
    <div>
         <form onSubmit={handleEnterFakeDef}>
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
          </form>
    </div>
  )
}

export default DefInputBox