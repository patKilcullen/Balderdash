import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL SCORES.... probably won't need
export const fetchAllScores = createAsyncThunk(
    "allScores",
    async () => {
      try {
        const { data } = await axios.get("/api/scores");
        console.log("ALL SCOREs IN THUNK: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL SCORES THUNK: ", error);
      }
    }
  );

  export const fetchAllGameScores = createAsyncThunk(
    "allScores",
    async (gameId) => {
      try {
        const { data } = await axios.get(`/api/scores/game/${gameId}`);
        console.log("ALL GAMES SCOREs IN THUNK: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL SCORES THUNK: ", error);
      }
    }
  );


// CREATE A GAME
  export const createScore = createAsyncThunk(
    "createScore",
    async ({score, accepted, gameId, userId}) => {
        
      try {
        const { data } = await axios.post("/api/scores",{score, accepted, gameId,userId});
      
        return data;
      } catch (error) {
        console.log("ERROR IN CREAT Score THUNK: ", error);
      }
    }
  );

  // Edit Score
  export const editScore = createAsyncThunk(
    "editScore",
    async (score) => {

      try {
        const { data } = await axios.put(`/api/scores/${score.userId}`, score);
        console.log("DATAAAA: ", data)
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const deleteScore = createAsyncThunk(
    "deleteScore",
    async (score) => {
      console.log("SCORE in deltel thunk: ", score)
      try {
         await axios.delete(`/api/scores/${score.gameId}/${score.userId}`);
        
        //  What to return???  should core table have its own ID?
        return {gameId: score.gameId, userId: score.userId };
      } catch (err) {
        console.log(err);
      }
    }
  );




const allScoresSlice = createSlice({
name: "allScores",
initialState: [],
reducers: {},
extraReducers: (builder)=>{
    // builder.addCase(fetchAllScores.fulfilled, (state, action)=>{
    //     return action.payload
    // }),
    builder.addCase(fetchAllGameScores.fulfilled, (state, action)=>{
      return action.payload
  }),
    builder.addCase(createScore.fulfilled, (state, action)=>{
        state.push(action.payload)
    }),
    builder.addCase(editScore.fulfilled, (state, action)=>{
      state.push(action.payload)
  }),
  builder.addCase(deleteScore.fulfilled, (state, action) => {
    console.log("AX PAY: ", action.payload)
    // state.allScores = state.allScores.filter(score =>{

    //   return score !== action.payload
    // });
    console.log("STATE: ", state.allScores)
  })
  
}


})

export const selectAllScores = (state)=>{
    return state.allScores
}

export default allScoresSlice.reducer