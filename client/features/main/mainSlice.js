import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import defaultDefs from './defaultFakeDefs';
// require('dotenv').config();
// const jwt = require('jsonwebtoken')


// export const getWord = createAsyncThunk(
//     '/getWord',
//     async (word) => {
//       try {
//         const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//    console.log("DATA : ", data[0].word)
//    console.log("DATA2 : ", data[0].meanings[0].definitions[0].definition)
//         return data[0].word;
//       } catch (error) {
//         console.log("EROR IN GET DEFINITIOM")
//         return error.message;
//       }
//     }
//   );
export const getWord = createAsyncThunk(
  '/getWord',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.herokuapp.com/word`);
      return data
    } catch (error) {
      console.log("EROR IN GET DEFINITIOM")
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
      console.log("EROR IN GET DEFINITIOM")
      return error.message;
    }
  }
);
//   export const getDefinition = createAsyncThunk(
//     '/getDefinition',
//     async (word) => {
//       try {
//         const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
// //    console.log("DATA : ", data[0].word)
// //    console.log("DATA2 : ", data[0].meanings[0].definitions[1].definition)
// //    console.log("DEF LENGTH: ", data[0].meanings[0].definitions.length)
//    const numOfDefs = Math.floor(Math.random() * data[0].meanings[0].definitions.length)
//    console.log("NUM OF DEFS : ", numOfDefs)
//         return data[0].meanings[0].definitions[numOfDefs].definition
//       } catch (error) {
//         console.log("EROR IN GET DEFINITIOM")
//         return error.message;
//       }
//     }
//   );
  export const getDefinition = createAsyncThunk(
    '/getDefinition',
    async (word) => {
      console.log("WORD IN GET MERI: ", word)
      try {
        // const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
        const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
         console.log("DATA in reg meri: ", data)
         console.log("destructed in  reg meri: ", data[0].shortdef)
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         console.log("DEF NUMBER: ", numOfDefs)
         return data[0].shortdef[numOfDefs]
         }else{
          return "That word is too weird, try again"
         }
      } catch (error) {
        console.log("EROR IN Get MERi DEFINITIOM")
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
         console.log("DATA in reg meri: ", data)
         console.log("destructed in  reg meri: ", data[0].shortdef)
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         console.log("DEF NUMBER: ", numOfDefs)
         return data[0].shortdef[numOfDefs]
         }
         else{
          const defaultNum = Math.floor((Math.random() * defaultDefs.length))

          return defaultDefs[defaultNum]
         }
      } catch (error) {
        console.log("EROR IN Get MERi DEFINITIOM")
        return error.message;
      }
    }
  );


  // export const getMeri = createAsyncThunk(
  //   '/getDefinition',
  //   async (word) => {
  //     console.log("WORD IN GET MERI: ", word)
  //     try {
  //       const data = await axios.get(`/api/dictionary/${word}`)
  //       // const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.dictionaryKey}`);
  //       //  const { data } = await axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=3ca1a8b0-158e-4e88-b635-579bf43719f4`);
  //       console.log("DATA getMEri: ", data)
  
  //     } catch (error) {
  //       console.log("EROR IN Get MERi DEFINITIOM")
  //       return error.message;
  //     }
  //   }
  // );


const initialState = {
    word: {},
    definition: {},
    fakeWords: [],
    fakeDefinitions: []
}
const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers: {
      clearFakeDefs(state, action){
        state.fakeDefinitions = []
      }
    },
    extraReducers: (builder)=>{
        builder
        .addCase('/getWord/fulfilled', (state, action) => {
            console.log("ACtion Paylod ", action.payload)
           state.word = action.payload
          //  state.fakeWords.push(action.payload)
        })
        .addCase('/getDefinition/fulfilled', (state, action) => {
            // console.log("ACtion Paylod ", action.payload)
           state.definition = action.payload
          //  state.fakeDefinitions.push(action.payload)
        })
        .addCase('/getFakeWords/fulfilled', (state, action) => {
          // console.log("ACtion Paylod ", action.payload)
         state.fakeWords.push(action.payload)
      })
      .addCase('/getFakeDefinitions/fulfilled', (state, action) => {
         console.log("ACtion Paylod ", action.payload)
       state.fakeDefinitions.push(action.payload)
    })
    }
})

export const selectWord = (state)=>{
    return state.main.word
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
export const { clearFakeDefs } = mainSlice.actions;

export default mainSlice.reducer