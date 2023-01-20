import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { selectWord, getWord, selectDefinition, getDefinition, getMeriDefinition, getMeri,getFakeWords, selectFakeWords } from './mainSlice'



const Main = () => {
const dispatch = useDispatch()
    



// useEffect(()=>{
//     dispatch(getWord())
//     // .then(()=>{
//     //     dispatch(getDefinition())
//     // })
//     // dispatch(getDefinition('ass'))
// },[])

const word = useSelector(selectWord)

const definition = useSelector(selectDefinition)
// console.log("DEFINTTT: ", definition)


const handleGetMeri = ()=>{
  dispatch(getMeriDefinition(word[0]))
}

const handleGetWord = ()=>{
  dispatch(getWord())
}
const fakeDefs = [];
// const fakeWords = []
const handleGetFakes = ()=>{
let count = 0
while (count < 5){
  dispatch(getFakeWords())
  // .then(()=>{
  //   let fakeWord = useSelector(selectWord).then(()=>{
  //     fakeWords.push(fakeWord)
  //   })
   
  // })
  
    // dispatch(getMeriDefinition(word[0]))
    // let fakeDef = useSelector(selectDefinition)
    // console.log("FAKE DEF: ", fakeDef)
    // fakeDefs.push(fakeDef)
 
  count++
}
}


const fakeWords = useSelector(selectFakeWords)
console.log("FAKE DEFS", fakeDefs)
console.log("FAKE Words", fakeWords)

  return (
    <div>
    <div>Let's BALDERDASH!!!</div>
    <button onClick={()=> handleGetWord()}>Get Word</button>
<h2>{typeof word[0] === 'string' ? word[0] : " "}</h2>
<button onClick={()=> handleGetMeri()}>Get Definition</button>

<h3>{typeof definition === 'string' ? definition : " "}</h3>
<button onClick={()=> handleGetMeri()}>Try For Another definition</button>
<button onClick={()=> handleGetFakes()}>Get Fake Definitions</button>

    </div>
  )
}

export default Main