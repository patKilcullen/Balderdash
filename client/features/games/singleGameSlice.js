import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// // GET ALL GAMES
export const fetchSingleGame = createAsyncThunk("singleGame", async (id) => {
  try {
    const { data } = await axios.get(`/api/games/${id}`);

    return data;
  } catch (error) {
    console.log("ERROR IN SINBGLE GAME THUNK: ", error);
  }
});



  // Get Single Game
  export const findGameByName = createAsyncThunk(
    "findGameByName",
    async (gameName) => {
 
      try {
        const { data } = await axios.get(`/api/games/findGame/${gameName}`);
        console.log("DATA IN SLICE: ", data)
        return data;
      } catch (error) {
        console.log("ERROR IN FETCH ALL GAMES THUNK: ", error);
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




export const editGame = createAsyncThunk("editGame", async (game) => {

  try {
    const { data } = await axios.put(`/api/games/${game.id}`, game);
    
    return data;
  } catch (err) {
    console.log(err);
  }
});


export const editGameTurn = createAsyncThunk("editGameTurn", async ({gameId, turn, roundsLeft, started}) => {

  try {
    const { data } = await axios.patch(`/api/games/${gameId}/changeTurn`, {turn, roundsLeft, started});
    
    return data;
  } catch (err) {
    console.log(err);
  }
});

// CREATE GAME
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


const singleGameSlice = createSlice({
  name: "singleGame",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    // removed this because its only used for search game link and doesn;t need to be put in store(if it does the game doesnt load when cliking the link from serach game)
    builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
      
      return action.payload;
    });
    builder.addCase(findGameByName.fulfilled, (state, action) => {
      console.log("ACTIO NAPPSDS SA ASD ADS AS: ", action.payload)
      return action.payload;
    });
    builder.addCase(editGameTurn.fulfilled, (state, action) => {
      return action.payload;
    })
    builder.addCase(editGame.fulfilled, (state, action) => {
      return action.payload;
    })
    builder.addCase(createGame.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export const selectSingleGame = (state) => {
  return state.singleGame;
};

export default singleGameSlice.reducer;








// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // GET ALL GAMES
// export const fetchSingleGame = createAsyncThunk("singleGame", async (id) => {
//   try {
//     const { data } = await axios.get(`/api/games/${id}`);

//     return data;
//   } catch (error) {
//     console.log("ERROR IN SINBGLE GAME THUNK: ", error);
//   }
// });


// // export const addGamePlayer = createAsyncThunk(
// //   "addGamePlayer",
// //   async (gameId) => {
// //     try {
// //       const { data } = await axios.put(`/api/games/${gameId}`,{

// //       });

// //       return data;
// //     } catch (error) {
// //       console.log("ERROR IN SINBGLE GAME THUNK: ", error);
// //     }
// //   }
// // );




// export const editGame = createAsyncThunk("editGame", async (game) => {

//   try {
//     const { data } = await axios.put(`/api/games/${game.id}`, game);
    
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// });


// export const editGameTurn = createAsyncThunk("editGameTurn", async ({gameId, turn, roundsLeft}) => {

//   try {
//     const { data } = await axios.patch(`/api/games/${gameId}/changeTurn`, {turn, roundsLeft});
    
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// });



// const singleGameSlice = createSlice({
//   name: "singleGame",
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
//       return action.payload;
//     });
//     builder.addCase(editGameTurn.fulfilled, (state, action) => {
//       return action.payload;
//     })
//     builder.addCase(editGame.fulfilled, (state, action) => {
//       return action.payload;
//     })
//   },
// });

// export const selectSingleGame = (state) => {
//   return state.singleGame;
// };

// export default singleGameSlice.reducer;