import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import defaultDefs from './defaultFakeDefs';


// GET WORD
export const getWord = createAsyncThunk(
  '/getWord',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1`);
   
      return data
    } catch (error) {
      console.log("ERROR IN GET WORD", error)
      return error.message;
    }
  }
);

// GET FAKE WORDS
export const getFakeWords = createAsyncThunk(
  '/getFakeWords',
  async () => {
    try {
      const { data } = await axios.get(`https://random-word-api.vercel.app/api?words=1`);
      return data
    } catch (error) {
      console.log("ERROR IN GET FAKES WORDS")
      return error.message;
    }
  }
);

// GET DEFINTION
  export const getDefinition = createAsyncThunk(
    '/getDefinition',
    async (word) => {
      try {
        const { data } = await axios.get(`/api/wordsAndDefinitions/${word}`,);
         if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         return data[0].shortdef[numOfDefs]
         }else{
          return "That word is too weird, try again"
         }
      } catch (error) {
        console.log("ERROR IN Get  DEFINITIOM")
        return error.message;
      }
    }
  );

  // GET FAKE DEFINITIONS
  export const getFakeDefinitions = createAsyncThunk(
    '/getFakeDefinitions',
    async (word) => {
   
      try {
        const { data } = await axios.get(`/api/wordsAndDefinitions/${word}`,); 
        if(data[0].shortdef){
         const numOfDefs = Math.floor((Math.random() * data[0].shortdef.length))
         return data[0].shortdef[numOfDefs]
         }
         else{
          const defaultNum = Math.floor((Math.random() * defaultDefs.length))

          return defaultDefs[defaultNum]
         }
      } catch (error) {
        console.log("ERROR un getFakeDefinition")
        return error.message;
      }
    }
  );


 


const initialState = {
    word: {},
    definition: {},
    fakeWords: [],
    fakeDefinitions: [],
    tempScoreCard: [],
    playerFakeDef: []
}
const gamePlaySlice = createSlice({
  name: "gamePlay",
  initialState,
  reducers: {
    setWordState(state, action) {
      state.word = action.payload;
    },
    clearFakeDefs(state, action) {
      state.fakeDefinitions = [];
    },
    clearFakeWords(state, action) {
      state.fakeWords = [];
    },
    addDefinition(state, action) {
      state.fakeDefinitions.push(action.payload);
    },
    addRealDefinition(state, action) {
      state.definition = action.payload;
    },

    addPlayerFakeDef(state, action) {
      state.playerFakeDef = action.payload;
    },
    // NEEDED?
    // clearPlayerFakeDef(state, action) {
    //   state.playerFakeDef = {};
    // },
    clearDefinition(state, action) {
      state.definition = {};
    },
    addWordPlayerNotTurn(state, action) {
      state.word = action.payload;
    },
    addTempScoreCardMessage(state, action) {
      if(!state.tempScoreCard.includes(action.payload)){
      state.tempScoreCard.push(action.payload);
      }else {
        return state
      }
    },
    clearTempScoreCardMessages(state, action) {
      state.tempScoreCard = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase("/getWord/fulfilled", (state, action) => {
        state.word = action.payload;
      })
      .addCase("/getDefinition/fulfilled", (state, action) => {
        state.definition = action.payload;
      })
      .addCase("/getFakeWords/fulfilled", (state, action) => {
        state.fakeWords.push(action.payload);
      })
      .addCase("/getFakeDefinitions/fulfilled", (state, action) => {
        state.fakeDefinitions.push({ fake: action.payload });
        state.fakeDefinitions = randomizeArray(state.fakeDefinitions);
      });
  },
});

// RANDOMIZE THE ORDER OF DEFINITIONS BEFORE ADDING TO STATE
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
export const selectRealDefinition = (state) => {
  return state.gamePlay.definition;
};
export const selectFakeDefinitions = (state)=>{
    return state.gamePlay.fakeDefinitions
}
export const selectFakeWords = (state)=>{
  return state.gamePlay.fakeWords
}
export const selectTempScoreCardMessages = (state)=>{
  return state.gamePlay.tempScoreCard
}
export const selectPlayerFakeDef = (state) => {
  return state.gamePlay.playerFakeDef;
};


export const {
  setWordState,
  clearFakeDefs,
  clearFakeWords,
  addWordPlayerNotTurn,
  addDefinition,
  addRealDefinition,
  addPlayerFakeDef,
  addTempScoreCardMessage,
  clearTempScoreCardMessages,
} = gamePlaySlice.actions;

export default gamePlaySlice.reducer