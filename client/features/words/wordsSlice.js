// ADD NEW WORD AND DEFINITON TO DATABASE FOR FUTURE USE IN GAME

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewWord = createAsyncThunk(
  "addNewWord",
  async ({ word, definition }) => {
    console.log("OES THIS CHANGE");
    try {
      const { data } = await axios.post("/api/newWords", {
        word: word,
        definition: definition,
      });
      console.log(
        "RAW SQL DATAdfsdfsdfsdfsdfsdfsdfsdfsdfdsfd in thunk: ",
        data
      );
      return data;
    } catch (error) {
      console.log("ERROR IN FETCH ALL SCORES PG THUNK: ", error);
    }
  }
);
