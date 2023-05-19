import React, { useState, useEffect, useContext } from 'react';
import socket from "socket.io-client";
import { SocketContext } from "../../app/SocketProvider";

const Timer = ({gameName}) => {
  const [countdown, setCountdown] = useState(120); // Initial countdown value
  const clientSocket = useContext(SocketContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrease countdown value
      }
    }, 1000); // Update countdown every second

    // Cleanup the timer when the component unmounts
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

  return <div>{countdown}</div>; // Display countdown on the UI
};

export default Timer;