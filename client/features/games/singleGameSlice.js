import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
export const fetchSingleGame = createAsyncThunk("singleGame", async (id) => {
  try {
    const { data } = await axios.get(`/api/games/${id}`);

    return data;
  } catch (error) {
    console.log("ERROR IN SINBGLE GAME THUNK: ", error);
  }
});


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




export const editGame = createAsyncThunk("editGame", async (game) => {

  try {
    const { data } = await axios.put(`/api/games/${game.id}`, game);
    
    return data;
  } catch (err) {
    console.log(err);
  }
});


export const editGameTurn = createAsyncThunk("editGameTurn", async ({gameId, turn}) => {

  try {
    const { data } = await axios.patch(`/api/games/${gameId}/changeTurn`, {turn});
    
    return data;
  } catch (err) {
    console.log(err);
  }
});

// export const changeGameTurn = createAsyncThunk(
//   "changeGameTun",
//   async (gameId) => {
// console.log("Change Score THUNK: ", gameId)
//     try {
//       const { data } = await axios.put(`/api/games/${gameId}/changeScore`, );
//       console.log("DATAAAA: ", data)
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );



const singleGameSlice = createSlice({
  name: "singleGame",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editGameTurn.fulfilled, (state, action) => {
      return action.payload;
    })
    builder.addCase(editGame.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export const selectSingleGame = (state) => {
  return state.singleGame;
};

export default singleGameSlice.reducer;
