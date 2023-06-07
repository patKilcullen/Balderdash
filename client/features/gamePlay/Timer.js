import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux"
// import socket from "socket.io-client";
import { SocketContext } from "../../app/SocketProvider";
import DefInputBox from './DefInputBox';
import GuessDefs from './GuessDefs';
import { selectFakeWords, getFakeDefinitions, selectFakeDefinitions } from './gamePlaySlice';



const Timer = ({game, username, userId, userScore, gameName, gameId, playerTurnName,  reloadScores, setDefinition, setWord, setTimer, setChoseWord}) => {
  const [countdown, setCountdown] = useState(10)  
  const [defInput, setDefInput] = useState(false)
  const [playGame, setPlayGame] = useState(false)

  const clientSocket = useContext(SocketContext);
  const dispatch = useDispatch()


  const fakeWords = useSelector(selectFakeWords)
  const fakeDefinitions = useSelector(selectFakeDefinitions)


  const handleGetFakeDefinitions = () => {
    fakeWords
      .forEach((word) => {
        dispatch(getFakeDefinitions(word));
      })

  };





  useEffect(() => {
    const timer = setTimeout(() => {
        
      if (countdown > 0) {
        setDefInput(true)
        setCountdown(countdown - 1); 
      }
      else if(countdown === 0){
        handleGetFakeDefinitions()
setPlayGame(true)
      }
      else{
        setDefInput(false)
      }

    }, 1000)
    
    // Cleanup the timer when the component unmounts
    // NEEDED?
     return () => clearTimeout(timer);
  }, [countdown]);


  useEffect(()=>{
    clientSocket.emit("start_countdown", {gameName})
      },[])


      




  return (
    <div style={{position: "realtive"}}>
  <div style={{position: "fixed", left: "50px", top: "50px", color: "red"}}>Time: {countdown}</div> 
 {/* { defInput && !userScore.turn ?<DefInputBox gameName={gameName} userId={userId} playerTurnName={playerTurnName}/>: null} */}
 { defInput && userScore.turnNum !== game.turn ?<DefInputBox game={game} gameName={gameName} userId={userId} playerTurnName={playerTurnName}/>: null}
 {playGame ? <GuessDefs game={game} username={username} fakeDefinitions={fakeDefinitions} gameName={gameName} gameId={gameId} userId={userId} Name={playerTurnName} reloadScores={reloadScores} setDefinition={setDefinition} setWord={setWord} setTimer={setTimer} setPlayGame={setPlayGame} setChoseWord={setChoseWord}/>: null}
  </div>
)};

export default Timer;