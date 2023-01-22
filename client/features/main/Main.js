import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectWord,
  getWord,
  selectDefinition,
  getDefinition,
  getFakeWords,
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
  clearFakeDefs,
} from "./mainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const word = useSelector(selectWord);
  const definition = useSelector(selectDefinition);
  const [defArray, setDefArray] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0)
  const [reply, setReply] = useState("")
  // console.log("DEFINTTT: ", definition)

  const handleGetDefs = () => {
    
    dispatch(getDefinition(word[0]))
      .then(() => {
        handleGetFakeDefinitions();
      })
      .then(() => {
        pushDefs();
      })
  };

  const pushDefs = () => {
    for (const def of fakeDefinitions) {
      allDefs.push(def);
    }
    allDefs.push(definition);
    if(definition === "That word is too weird, try again"){
      setReply("That word is too weird, try again")
    }
  };

  useEffect(() => {}, [handleGetFakeDefinitions]);

  const handleGetWord = () => {
    dispatch(getWord()).then(() => {
      handleGetFakeWords();
    });
  };

  const handleGetFakeWords = () => {
    dispatch(clearFakeDefs())
     allDefs = []
    let count = 0;
    while (count < 5) {
      dispatch(getFakeWords());
      count++;
    }
  };
  const fakeWords = useSelector(selectFakeWords);

  const handleGetFakeDefinitions = () => {
    fakeWords
      .forEach((word) => {
        dispatch(getFakeDefinitions(word));
      })
      .then(() => {
        getFakeDefinitions(word[0]);
      });
  };

  const fakeDefinitions = useSelector(selectFakeDefinitions);

  
  let allDefs;
  let finalArr = (finalArr = Object.values(defArray));
  const play = () => {
    let allDefs = Object.values(fakeDefinitions);

    let radnomNum = Math.floor(Math.random() * allDefs.length);

    allDefs.splice(radnomNum, 0, definition);
    setDefArray(allDefs);
    dispatch(clearFakeDefs())
  };

  const handleChooseWord = (def) => {
setDefArray([])
allDefs = []
setRound(round + 1)
setReply("CORRECT!")
def === definition ? setScore(score + 1)
   :
setReply(`Wrongo! the anser was ${definition}`)

  }
  return (
    <div>
      <div>Let's BALDERDASH!!!</div>
      <h1>Score: {score}/{round}</h1>
      <h1>{reply}</h1>
      <button onClick={() => handleGetWord()}>Get Word</button>
      <h2>{typeof word[0] === "string" ? word[0] : " "}</h2>
      <button onClick={() => handleGetDefs()}>Get Definition</button>

      <h3>{typeof definition === "string" ? definition : " "}</h3>
      {/* <button onClick={()=> handleGetDefs()}>Try For Another definition</button>
<button onClick={()=> handleGetFakeWords()}>Get Fake Words</button>
<button onClick={()=> handleGetFakeDefinitions()}>Get Fake Definitions</button> */}
      <button onClick={() => play()}>Play</button>
      <div>
        {/* {allDefs ? 
allDefs.map((def)=>{
  <h1>{55}</h1>
}): ""
} */}
        {/* <h1>{defArray}</h1> */}
      </div>
      <div>
        {finalArr.map((def) => {
          return <button onClick={() => handleChooseWord(def)}>{def}</button>;
        })}
      </div>
      <button
      onClick={()=> dispatch(clearFakeDefs())}>CLEAR DEFS </button>
    </div>
  );
};

export default Main;
