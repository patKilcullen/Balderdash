import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
export const fetchSingleGame = createAsyncThunk(
    "singleGame",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/games/${id}`);
  
        return data;
      } catch (error) {
        console.log("ERROR IN SINBGLE GAME THUNK: ", error);
      }
    }
  );

  // export const addGamePlayer = createAsyncThunk(
  //   "addGamePlayer",
  //   async (gameId) => {
  //     try {
  //       const { data } = await axios.put(`/api/games/${gameId}`,{

  //       });
  
  //       return data;
  //     } catch (error) {
  //       console.log("ERROR IN SINBGLE GAME THUNK: ", error);
  //     }
  //   }
  // );

  export const editGame = createAsyncThunk(
    "editGame",
    async (game) => {

      try {
        const { data } = await axios.put(`/api/games/${game.id}`, game);
        console.log("DATAAAA: ", data)
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );


// CREATE A GAME 
// might make more sense if this is here instead of all games
//   export const createGame = createAsyncThunk(
//     "createGame",
//     async ({userId, name, rounds, winner, started, complete}) => {
//         console.log("HIT CREAT EGAME THUNKKKKK", name, rounds)
//       try {
//         const { data } = await axios.post("/api/games",{userId, name, rounds, winner, started, complete});
      
//         return data;
//       } catch (error) {
//         console.log("ERROR IN CREAT GAME THUNK: ", error);
//       }
//     }
//   );



const singleGameSlice = createSlice({
name: "singleGame",
initialState: {},
reducers: {},
extraReducers: (builder)=>{
    builder.addCase(fetchSingleGame.fulfilled, (state, action)=>{
        return action.payload
    })
   
}


})

export const selectSingleGame = (state)=>{
    return state.singleGame
}

export default singleGameSlice.reducer