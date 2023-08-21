import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





export const askAI = createAsyncThunk(
  "/askAI",
  async ({ word, definition }) => {
    console.log("WORD DEF ASKAI: ", word, definition)
     try {
       const response = await fetch("/api/openAI", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ word, definition }),
       });
console.log("JUST RESPONE IN askAI thunk: ", response)
       const data = await response.json();
       console.log("FETCH ASK AI: ", data); // Process the response data as needed
     } catch (error) {
       console.error("Error:", error);
     }
  }
);
