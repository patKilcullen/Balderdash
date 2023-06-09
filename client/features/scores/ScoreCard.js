import React, {useEffect, useState} from 'react'






const ScoreCard = ({scoreCard}) => {

    const [countdown, setCountdown] = useState(10) 
    const [showScoreCard, setShowScoreCard] = useState(false) 
    useEffect(() => {

        const timer = setTimeout(() => {
            
          if (countdown > 0) {
            setCountdown(countdown - 1); 
            setShowScoreCard(true)
          }
          else {
            setShowScoreCard(false)
          }
          
    
        }, 1000)
        
        // Cleanup the timer when the component unmounts
        // NEEDED?
         return () => clearTimeout(timer);
      }, [countdown]);

// console.log("socre acare in SCOREA CARD COMPONENT: ",scoreCard)



  return (


        <div>{scoreCard && scoreCard.length ? 
scoreCard.map((message)=>{
    return(
        <div>{message}</div>
    )
})
       :null} </div>
 
  )
}

export default ScoreCard