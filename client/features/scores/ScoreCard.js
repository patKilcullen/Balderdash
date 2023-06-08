import React from 'react'






const ScoreCard = ({scoreCard}) => {


console.log("socre acare in SCOREA CARD COMPONENT: ",scoreCard)



  return (
    <div>ScoreCard

        <div>{scoreCard && scoreCard.length ? 
scoreCard.map((message)=>{
    return(
        <div>{message}</div>
    )
})
       :null} </div>
    </div>
  )
}

export default ScoreCard