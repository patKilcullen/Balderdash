import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux"
// import socket from "socket.io-client";
import { SocketContext } from "../../app/SocketProvider";
import DefInputBox from './DefInputBox';
import GuessDefs from './GuessDefs';
import { selectFakeWords, getFakeDefinitions, selectFakeDefinitions } from './gamePlaySlice';



const Timer = ({userId, userScore, gameName, gameId, playerTurnName, definition}) => {
  const [countdown, setCountdown] = useState(10); // Initial countdown value    
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
    //   .then(() => {
    //     getFakeDefinitions(word);
    //   });
  };

  
//   console.log("GAMENAME IN TIEMS: ", gameName, userId, userScore)

  useEffect(() => {
    const timer = setTimeout(() => {
        
      if (countdown > 0) {
        setDefInput(true)
        setCountdown(countdown - 1); // Decrease countdown value
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


      

//   may not need to send this countdown if can just ssend sock that starts others countdown...
//   useEffect(()=>{
// clientSocket.emit("send_countdown", {countdown: countdown, gameName: gameName})
//   },[countdown])



//   useEffect(()=>{

// //   This sends the actual count, but it may not be necessayr 
// // because it start other socket time when it sets tot true
// // could possibly add bolean to timer component...it can be changed through props
//   clientSocket.on("receive_countdown",(countdown)=>{
//     console.log("Countdown: ", countdown)
//      setCountdown(countdown.countdown)
//   })
// },[clientSocket])


//   useEffect(() => {
    

//     clientSocket.on('countdownUpdate', (newCountdown) => {
//       setCountdown(newCountdown);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

  return (
    <div>
  <div>{countdown}</div> 
 { defInput && !userScore.turn ?<DefInputBox gameName={gameName} userId={userId} playerTurnName={playerTurnName}/>: null}
 {playGame ? <GuessDefs fakeDefinitions={fakeDefinitions} gameName={gameName} gameId={gameId} userId={userId} playerTurnName={playerTurnName}/>: null}
  </div>
)};

export default Timer;