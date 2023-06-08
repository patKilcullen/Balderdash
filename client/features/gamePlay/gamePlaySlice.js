import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import defaultDefs from './defaultFakeDefs';


export const getWord = createAsyncThunk(
  '/getWord',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1`);
   
      return data
    } catch (error) {
      console.log("ERROR IN GET WdddddddORD", error)
      return error.message;
    }
  }
);





export const getFakeWords = createAsyncThunk(
  '/getFakeWords',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1`);
      return data
    } catch (error) {
      console.log("EROR IN GET FAKES WORDS")
      return error.message;
    }
  }
);

  export const getDefinition = createAsyncThunk(
    '/getDefinition',
    async (word) => {
      console.log("WORD IN GET MERI: ", word)
      try {
        // const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         return data[0].shortdef[numOfDefs]
         }else{
          return "That word is too weird, try again"
         }
      } catch (error) {
        console.log("EROR IN Get  DEFINITIOM")
        return error.message;
      }
    }
  );

  export const getFakeDefinitions = createAsyncThunk(
    '/getFakeDefinitions',
    async (word) => {
   
      try {
        // const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         console.log("DATA[0}: ", data[0].shortdef[numOfDefs])
         return data[0].shortdef[numOfDefs]
         }
         else{
          const defaultNum = Math.floor((Math.random() * defaultDefs.length))

          return defaultDefs[defaultNum]
         }
      } catch (error) {
        console.log("EROR IN Get Fake DEFINITIOM")
        return error.message;
      }
    }
  );


 


const initialState = {
    word: {},
    definition: {},
    fakeWords: [],
    fakeDefinitions: [],
    scoreCard: []
}
const gamePlaySlice = createSlice({
    name:"gamePlay",
    initialState,
    reducers: {
      clearFakeDefs(state, action){
        state.fakeDefinitions = []
      },
      clearFakeWords(state, action){
        state.fakeWords = []
      },
      clearDefinition(state, action){
        state.definition = {}
      },
      addDefinition(state, action){
        state.fakeDefinitions.push(action.payload)
      },

      addWordPlayerNotTurn(state,action){
          state.word = action.payload
      },
      addScoreCardMessage(state, action){
        state.scoreCard.push(action.payload)
      },
      clearScoreCardMessages(state, action){
        state.scoreCard = []
      },
    },
  


    extraReducers: (builder)=>{
        builder
        .addCase('/getWord/fulfilled', (state, action) => {
            
           state.word = action.payload
        })
        .addCase('/getDefinition/fulfilled', (state, action) => {
           state.definition = action.payload
        })
        .addCase('/getFakeWords/fulfilled', (state, action) => {
         state.fakeWords.push(action.payload)
      })
      .addCase('/getFakeDefinitions/fulfilled', (state, action) => {
        // const randomIndex = Math.floor(Math.random() * (state.fakeDefinitions.length))
        // state.fakeDefinitions.splice(randomIndex,0,{fake: action.payload})
        state.fakeDefinitions.push({fake: action.payload})
        state.fakeDefinitions = randomizeArray(state.fakeDefinitions)
    })
    }
})
function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const selectWord = (state)=>{
    return state.gamePlay.word
}
export const selectDefinition = (state)=>{
    return state.gamePlay.definition
}
export const selectFakeDefinitions = (state)=>{
    return state.gamePlay.fakeDefinitions
}
export const selectFakeWords = (state)=>{
  return state.gamePlay.fakeWords
}
export const selectScoreCardMessages = (state)=>{
  return state.gamePlay.scoreCard
}


export const { clearFakeDefs, clearFakeWords, addWordPlayerNotTurn, addDefinition,addScoreCardMessage,clearScoreCardMessages } = gamePlaySlice.actions;

export default gamePlaySlice.reducer