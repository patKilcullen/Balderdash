import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'



import { selectWord, getWord, selectDefinition, getDefinition,getFakeWords, selectFakeWords, getFakeDefinitions, selectFakeDefinitions, clearFakeDefs } from './mainSlice'



const Main = () => {
const dispatch = useDispatch()
    



const word = useSelector(selectWord)
const definition = useSelector(selectDefinition)


// console.log("DEFINTTT: ", definition)



const handleGetDefs = ()=>{
  dispatch(getDefinition(word[0]))
  .then(()=>{
    handleGetFakeDefinitions()
  })
  .then(()=>{
    pushDefs()
  })
  
}

const pushDefs = ()=>{
  for(const def of fakeDefinitions){
    allDefs.push(def)
  }
  allDefs.push(definition)
  console.log("ALLL DEFSS INSIDE: ", allDefs)
}
console.log("ALLL DEFSS: ", allDefs)

useEffect(()=>{
},[handleGetFakeDefinitions])

const handleGetWord = ()=>{
  dispatch(getWord()).then(()=>{
    handleGetFakeWords()
  })
}

const handleGetFakeWords = ()=>{
let count = 0
while (count < 5){
  dispatch(getFakeWords())
  count++
}
}
const fakeWords = useSelector(selectFakeWords)
console.log("FAKE Words", fakeWords)



const handleGetFakeDefinitions = ()=>{
  fakeWords.forEach(word => {
    dispatch(getFakeDefinitions(word))
  }).then(()=>{
    getFakeDefinitions(word[0])
  })

}

const fakeDefinitions = useSelector(selectFakeDefinitions)
console.log("FAKE DEFS: ", fakeDefinitions )



function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



console.log("DEF: ", definition)
let allDefs;
const play = ()=>{
let allDefs = Object.values(fakeDefinitions)
console.log("ALL DERFTS LENGH: ", allDefs.length)
let radnomNum = Math.floor(Math.random()* allDefs.length)
console.log("NUM : ", radnomNum)
allDefs.splice(radnomNum,0, definition)
console.log("ALLL DA DEFS : ", allDefs)
}


  return (
    <div>
    <div>Let's BALDERDASH!!!</div>
    <button onClick={()=> handleGetWord()}>Get Word</button>
<h2>{typeof word[0] === 'string' ? word[0] : " "}</h2>
<button onClick={()=> handleGetDefs()}>Get Definition</button>

<h3>{typeof definition === 'string' ? definition : " "}</h3>
<button onClick={()=> handleGetDefs()}>Try For Another definition</button>
<button onClick={()=> handleGetFakeWords()}>Get Fake Words</button>
<button onClick={()=> handleGetFakeDefinitions()}>Get Fake Definitions</button>
<button onClick={()=> play()}>Play</button>
    </div>
  )
}

export default Main