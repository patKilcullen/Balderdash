import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAME'S SCORES
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

// GET HIGHEST SCORE IN GAME
export const fetchHighestGameScores = createAsyncThunk(
  "highestScores",
  async (gameId) => {
    try {
      const { data } = await axios.get(
        `/api/scores/game/${gameId}/highestScores`
      );
      return data;
    } catch (error) {
      console.log("ERROR IN FETCH ALL SCORES THUNK: ", error);
    }
  }
);

// CREATE SCORE
export const createScore = createAsyncThunk(
  "createScore",
  async ({ score, accepted, turn, turnNum, gameId, userId }) => {
    try {
      const { data } = await axios.post("/api/scores", {
        score,
        accepted,
        turn,
        turnNum,
        gameId,
        userId,
      });
      return data;
    } catch (error) {
      console.log("ERROR IN CREAT Score THUNK: ", error);
    }
  }
);

// EDIT SCORE
export const editScore = createAsyncThunk("editScore", async (score) => {
  try {
    const { data } = await axios.put(`/api/scores/${score.userId}`, score);

    return data;
  } catch (err) {
    console.log(err);
  }
});

// ADD POINT TO SCORE
export const addPoint = createAsyncThunk(
  "addPoint",
  async ({ userId, gameId }) => {
    try {
      const { data } = await axios.put(`/api/scores/${userId}/addPoint`, {
        userId,
        gameId,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


// ADD POINT TO SCORE
export const add3Points = createAsyncThunk(
  "add3Points",
  async ({ userId, gameId }) => {
    try {
      const { data } = await axios.put(`/api/scores/${userId}/add3Points`, {
        userId,
        gameId,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// ADD POINT TO SCORE
export const subtract3Points = createAsyncThunk(
  "subtract3Points",
  async ({ userId, gameId }) => {
    try {
      const { data } = await axios.put(
        `/api/scores/${userId}/subtract3Points`,
        {
          userId,
          gameId,
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


// DELETE SCORE - for now used only when game owner denies request
export const deleteScore = createAsyncThunk("deleteScore", async (score) => {
  try {
    await axios.delete(`/api/scores/${score.gameId}/${score.userId}`);
    return { gameId: score.gameId, userId: score.userId };
  } catch (err) {
    console.log(err);
  }
});

const allScoresSlice = createSlice({
  name: "allScores",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllGameScores.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(createScore.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(editScore.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(addPoint.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(add3Points.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(subtract3Points.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      
  },
});

export const selectAllScores = (state) => {
  return state.allScores;
};

export default allScoresSlice.reducer;
