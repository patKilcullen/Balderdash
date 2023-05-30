import React, {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectFakeWords, getFakeDefinitions, selectFakeDefinitions } from './gamePlaySlice';
import { SocketContext } from "../../app/SocketProvider";

import { editScore, addPoint } from '../scores/scoresSlice';
import { editGameTurn } from '../games/singleGameSlice';


import Button from "@mui/material/Button";

const GuessDefs = ({game, userId, fakeDefinitions, gameName, gameId }) => {
  const clientSocket = useContext(SocketContext);

  const [fakeDefs, setFakeDefs] = useState([])
  const [correct, setCorrect] = useState(null)
  const [defList, setDefList] = useState(null)
  const [guessed, setGuessed] = useState(false)
  // const [incorrect, setIncorrect] = useState(false)
  // const fakeDefinitions = useSelector(selectFakeDefinitions)


const dispatch = useDispatch()





const [countdown, setCountdown] = useState(12);
useEffect(() => {
  const timer = setTimeout(() => {
      
    if (countdown > 0) {
      setDefList(true)
      setCountdown(countdown - 1); // Decrease countdown value
    }
    else if(countdown === 0){
      // handleGetFakeDefinitions()
      
      setDefList(false)

      handleChangeGameTurn()
      // HERE   NEEd to update the game turn, if its 1, it needs to be set to numPlayers, otherwise it needs to subtrack by 1
      // will need to change or scores turn as well, but that may take a lot becuse you have to firt
      // get the sore with turn and set to ti false and then get soce with same turnnum as game turn
      // instead of ever using the score turn, can just compare their turn num to the game turn
    }
    else{
      // setDefList(false)
    }

  }, 1000)
  
  // Cleanup the timer when the component unmounts
  // NEEDED?
   return () => clearTimeout(timer);
}, [countdown]);


const handleChangeGameTurn =()=>{

  game.turn === 1 ? 
  dispatch(editGameTurn({gameId: gameId, turn: game.numPlayers}))
  : dispatch(editGameTurn({gameId: gameId,turn: (game.turn - 1)}))
}


useEffect(()=>{
setFakeDefs(fakeDefinitions)
},[fakeDefinitions])


console.log("FAKE ADDS SD OFOFOODEFFFFS: ", fakeDefs)
const boner = fakeDefs.filter((def)=> !def.hasOwnProperty(`${userId}`))
console.log("OBNER: ", boner)
// const handleChooseWord = (def)=>{
//   console.log("DEF: ", Object.values(def)[0])
//   console.log("KEY: ", Object.keys(def)[0])


//   Object.keys(def)[0] === 'real' ?
//   dispatch(addPoint({userId, gameId})).then(()=>{
//  setCorrect(true)
//   })
// // dispatch(editScore({userId, gameId}))

// : setCorrect(false)


// Object.keys(def)[0] !== 'real' && Object.keys(def)[0] !== 'fake' ?
// dispatch(addPoint({userId: Object.keys(def)[0], gameId: gameId}))
// : null
// Object.keys(def)[0] !== 'fake' ? setCorrect(false) : null
// }


// THIS DOES NOT WORK, if choose both righ with two plays, one gets multiple points and the other gets none
const handleChooseWord = (def)=>{
  setGuessed(true)


  const userKey = Object.keys(def)[0]

console.log("userKey: ", userKey)
console.log("userId: ", userId) 
//   userKey === 'fake' ? null :
//   userKey === 'real' ?
//   console.log(`REAL: userId: ${userId}, gameId: ${gameId}` )
//   // dispatch(addPoint({userId: userId, gameId: gameId}))
// : 
//  userKey !== 'fake' && userKey !== 'real' ?
// dispatch(addPoint({userId: , gameId: gameId}))

//  :
//  null
if(userKey === 'fake'){
  console.log("FAKEEEEe")
} if (userKey === 'real'){
  console.log("REAL")
  dispatch(addPoint({userId: userId, gameId: gameId}))
}
if(userKey !== 'fake' && userKey !== 'real'){
  console.log(`REAL: userId: ${userKey}, gameId: ${gameId}` )
  dispatch(addPoint({userId: userKey, gameId: gameId}))
}
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
{correct === true  ? <div>Correctamundo!!!</div> : correct === false  ? <div>Wrong, idiot!</div> : null }
{guessed === false && defList === true && fakeDefs && fakeDefs.length
            ? 
            fakeDefs.filter((def)=> !def.hasOwnProperty(`${userId}`))
            .map((def) => {
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