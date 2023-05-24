import React, {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectFakeWords, getFakeDefinitions, selectFakeDefinitions } from './gamePlaySlice';
import { SocketContext } from "../../app/SocketProvider";


import Button from "@mui/material/Button";

const GuessDefs = ({fakeDefinitions, gameName}) => {
  const clientSocket = useContext(SocketContext);

  // const fakeDefinitions = useSelector(selectFakeDefinitions)
  console.log("FAke defs in guess defs: ", fakeDefinitions)







const handleChooseWord = (def)=>{
  console.log("DEF: ", Object.values(def)[0])
  console.log("KEY: ", Object.keys(def)[0])
}




useEffect(()=>{
  clientSocket.emit("send_fake_defs", {fakeDefinitions, gameName})
    },[fakeDefinitions])


  return (
    <div>
    <div>Definitions</div>
{/* {fakeDefinitions ? 
fakeDefinitions.map((def)=>{
return (
  <div>{def.valiue}</div>
)
  
})
:null} */}



{fakeDefinitions && fakeDefinitions.length
            ? fakeDefinitions.map((def) => {
              const value = Object.values(def)[0]
                return (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ border: "2px solid black" }}
                    onClick={() => handleChooseWord(def)}
                  >
                    {value}
                  </Button>
                );
              })
            : ""}
    </div>
  )
}

export default GuessDefs