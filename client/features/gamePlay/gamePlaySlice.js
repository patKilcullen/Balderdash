import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import defaultDefs from './defaultFakeDefs';


export const getWord = createAsyncThunk(
  '/getWord',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.herokuapp.com/word`);
      return data
    } catch (error) {
      console.log("ERROR IN GET WORD")
      return error.message;
    }
  }
);
export const getFakeWords = createAsyncThunk(
  '/getFakeWords',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.herokuapp.com/word`);
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
      console.log("WORD IN GET MERI: ", word)
      try {
        // const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
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
    fakeDefinitions: []
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
      addWordPlayerNotTurn(state,action){
        console.log("ACTION IN ADD WORD", action.payload)
          state.word = action.payload
          console.log("STATRT WORD: ", state.word)
      },
    },
  


    extraReducers: (builder)=>{
        builder
        .addCase('/getWord/fulfilled', (state, action) => {
            console.log("ACtion Paylod ", action.payload)
           state.word = action.payload
        })
        .addCase('/getDefinition/fulfilled', (state, action) => {
           state.definition = action.payload
        })
        .addCase('/getFakeWords/fulfilled', (state, action) => {
         state.fakeWords.push(action.payload)
      })
      .addCase('/getFakeDefinitions/fulfilled', (state, action) => {
       state.fakeDefinitions.push(action.payload)
    })
    }
})

export const selectWord = (state)=>{
    return state.gamePlay.word
}
export const selectDefinition = (state)=>{
    return state.main.definition
}
export const selectFakeDefinitions = (state)=>{
    return state.main.fakeDefinitions
}
export const selectFakeWords = (state)=>{
  return state.main.fakeWords
}


export const { clearFakeDefs, clearFakeWords, addWordPlayerNotTurn } = gamePlaySlice.actions;

export default gamePlaySlice.reducer