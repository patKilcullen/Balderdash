import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL SCORES.... probably won't need
export const fetchAllScores = createAsyncThunk(
    "allScores",
    async () => {
      try {
        const { data } = await axios.get("/api/scores");
      
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

        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL SCORES THUNK: ", error);
      }
    }
  );

  export const fetchHighestGameScores = createAsyncThunk(
    "highestScores",
    async (gameId) => {
      try {
        const { data } = await axios.get(`/api/scores/game/${gameId}/highestScores`);
console.log("HIGHEST SCORE IN THUNK: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL SCORES THUNK: ", error);
      }
    }
  );



// CREATE A Score
  export const createScore = createAsyncThunk(
    "createScore",
    async ({score, accepted, turn,  turnNum, gameId, userId}) => {
        
      try {

        const { data } = await axios.post("/api/scores",{score, accepted, turn, turnNum, gameId, userId});
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
       
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

// ADD POINT
  export const addPoint = createAsyncThunk(
    "addPoint",
    async ({userId, gameId}) => {

      try {
        const { data } = await axios.put(`/api/scores/${userId}/addPoint`, {userId, gameId});
     
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const deleteScore = createAsyncThunk(
    "deleteScore",
    async (score) => {
    
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

    // state.allScores = state.allScores.filter(score =>{

    //   return score !== action.payload
    // });

  }),
  builder.addCase(addPoint.fulfilled, (state, action)=>{

    state.push(action.payload)
})
}


})

export const selectAllScores = (state)=>{
    return state.allScores
}

export default allScoresSlice.reducer