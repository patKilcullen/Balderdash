import React, {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectFakeWords, getFakeDefinitions, selectFakeDefinitions } from './gamePlaySlice';
import { SocketContext } from "../../app/SocketProvider";


import Button from "@mui/material/Button";

const GuessDefs = ({fakeDefinitions, gameName}) => {
  const clientSocket = useContext(SocketContext);

  const [fakeDefs, setFakeDefs] = useState([])

  // const fakeDefinitions = useSelector(selectFakeDefinitions)
  console.log("FAke defs in guess defs: ", fakeDefinitions)



useEffect(()=>{
setFakeDefs(fakeDefinitions)
},[fakeDefinitions])



const handleChooseWord = (def)=>{
  console.log("DEF: ", Object.values(def)[0])
  console.log("KEY: ", Object.keys(def)[0])
}




useEffect(()=>{
  clientSocket.emit("send_fake_defs", {fakeDefinitions, gameName})
    },[fakeDefinitions])


//  useEffect(() => {
//       clientSocket.on("receive_fake_defs", ({ fakeDefinitions}) => {
//        setFakeDefs(fakeDefinitions)
//       });
  
  
//     }, [clientSocket,fakeDefinitions, gameName]);

    clientSocket.on("receive_fake_defs", ( fakeDefinitions) => {
      console.log("CAME BACK BABAY", fakeDefinitions)
      setFakeDefs(fakeDefinitions)
     });
 

  return (
    <div>
    <div>Definitions</div>

{/* {fakeDefinitions && fakeDefinitions.length
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
            : ""} */}

{fakeDefs && fakeDefs.length
            ? fakeDefs.map((def) => {
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