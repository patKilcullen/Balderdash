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
  // NEED?
  export const fetchAllUserGames = createAsyncThunk(
    "allUserGames",
    async (id) => {
      try {
        const { data } = await axios.get("/api/games");

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
    async ({userId, name, rounds, roundsLeft, winner, started, complete, ownerId, publicX, numPlayers, turn}) => {
      try {
        const { data } = await axios.post("/api/games",{userId, name, rounds, roundsLeft, winner, started, complete, ownerId, publicX, numPlayers, turn});
      
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
        state.push(action.payload)
    })
}


})

export const selectAllGames = (state)=>{
    return state.allGames
}

export default allGamesSlice.reducer