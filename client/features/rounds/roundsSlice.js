import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





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
//   export const addPoint = createAsyncThunk(
//     "addPoint",
//     async ({userId, gameId}) => {
// console.log("ADD POINT THUNK: ", userId, gameId)
//       try {
//         const { data } = await axios.put(`/api/scores/${userId}/addPoint`, {userId, gameId});
     
//         return data;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   );

//   export const deleteScore = createAsyncThunk(
//     "deleteScore",
//     async (score) => {
//       console.log("SCORE in deltel thunk: ", score)
//       try {
//          await axios.delete(`/api/scores/${score.gameId}/${score.userId}`);
        
//         //  What to return???  should core table have its own ID?
//         return {gameId: score.gameId, userId: score.userId };
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   );




const roundsSlice = createSlice({
name: "rounds",
initialState: [],
reducers: {},
extraReducers: (builder)=>{
    // builder.addCase(fetchAllScores.fulfilled, (state, action)=>{
    //     return action.payload
    // }),
  

}


})

// export const selectAllScores = (state)=>{
//     return state.allScores
// }

export default roundsSlice.reducer