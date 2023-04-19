import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
export const fetchAllGames = createAsyncThunk(
    "allGames",
    async () => {
      console.log("HELLOE FETST GAMESSSSSS")
      try {
        const { data } = await axios.get("/api/games");
        console.log("ALL GAMES IN THUNK: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL GAMES THUNK: ", error);
      }
    }
  );

//  All Public Games
  export const fetchAllPublicGames = createAsyncThunk(
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

  //  All Users Games includind not owned
  export const fetchAllUserGames = createAsyncThunk(
    "allUserGames",
    async (id) => {
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
// might make more sense in single gmae???
  export const createGame = createAsyncThunk(
    "createGame",
    async ({userId, name, rounds, winner, started, complete, ownerId}) => {
        console.log("HIT CREAT EGAME THUNKKKKK", name, rounds)
      try {
        const { data } = await axios.post("/api/games",{userId, name, rounds, winner, started, complete, ownerId});
      
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
    builder.addCase(fetchAllUserGames.fulfilled, (state, action)=>{
      console("USER GAMES AXION PAY LOADDDD: ", action.payload)
      // return action.payload
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