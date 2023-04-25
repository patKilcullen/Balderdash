import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
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


// CREATE A GAME
  export const createScore = createAsyncThunk(
    "createScore",
    async ({score, gameId, userId}) => {
        
      try {
        const { data } = await axios.post("/api/scores",{score,gameId,userId});
      
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
 console.log("SCORE: ", score)
      try {
        const { data } = await axios.put(`/api/scores/${score.userId}`, score);
        console.log("DATAAAA: ", data)
        return data;
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
    builder.addCase(fetchAllScores.fulfilled, (state, action)=>{
        return action.payload
    }),
    builder.addCase(createScore.fulfilled, (state, action)=>{
        state.push(action.payload)
    }),
    builder.addCase(editScore.fulfilled, (state, action)=>{
      state.push(action.payload)
  })
}


})

export const selectAllScores = (state)=>{
    return state.allScores
}

export default allScoresSlice.reducer