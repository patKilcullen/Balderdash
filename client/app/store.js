import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import mainReducer from "../features/main/mainSlice";
import allGamesSlice from "../features/games/allGamesSlice";
import singleGameSlice from "../features/games/singleGameSlice";
import singleUserSlice from "../features/users/singleUserSlice";
import allScoreSlice from "../features/scores/scoresSlice";
import gamePlaySlice from "../features/gamePlay/gamePlaySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    allGames: allGamesSlice,
    singleGame: singleGameSlice,
    singleUser: singleUserSlice,
    allScores: allScoreSlice,
    gamePlay: gamePlaySlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
