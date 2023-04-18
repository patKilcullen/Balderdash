import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
export const fetchAllGames = createAsyncThunk(
    "allGames",
    async () => {
      try {
        const { data } = await axios.get("/api/games");
        console.log("ALL GAMES IN THUNK: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL GAMES THUNK: ", error);
      }
    }
  );


// CREATE A GAME
  export const createGame = createAsyncThunk(
    "createGame",
    async ({name, rounds, winner, started, complete}) => {
        console.log("HIT CREAT EGAME THUNKKKKK")
      try {
        const { data } = await axios.post("/api/games",{name, rounds, winner, started, complete});
      
        return data;
      } catch (error) {
        console.log("ERROR IN CREAT GAME THUNK: ", error);
      }
    }
  );



const allGamesSlice = createSlice({
name: "allGames",
initialState: [],
reducers: {},
extraReducers: (builder)=>{
    builder.addCase(fetchAllGames.fulfilled, (state, action)=>{
        return action.payload
    }),
    builder.addCase(createGame.fulfilled, (state, action)=>{
        console.log("AXION: ", action.payload)
        state.push(action.payload)
    })
}


})

export const selectAllGames = (state)=>{
    return state.allGames
}

export default allGamesSlice.reducer