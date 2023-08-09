import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// CREATE A GAME
// might make more sense in single gmae???
export const createGame = createAsyncThunk(
  "createGame",
  async ({
    userId,
    name,
    rounds,
    roundsLeft,
    winner,
    started,
    complete,
    ownerId,
    publicX,
    numPlayers,
    turn,
  }) => {
    try {
      const { data } = await axios.post("/api/games", {
        userId,
        name,
        rounds,
        roundsLeft,
        winner,
        started,
        complete,
        ownerId,
        publicX,
        numPlayers,
        turn,
      });

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
  extraReducers: (builder) => {
      builder.addCase(createGame.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const selectAllGames = (state) => {
  return state.allGames;
};

export default allGamesSlice.reducer;
