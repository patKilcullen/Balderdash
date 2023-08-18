import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





export const askAI = createAsyncThunk(
  "/askAI",
  async ({ word, definition }) => {
    console.log("HIT THE THUNL")
     try {
       const response = await fetch("/api/openAI", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ word, definition }),
       });

       const data = await response.json();
       console.log("FETCH ASK AI ASS HOLE AI: ", data); // Process the response data as needed
     } catch (error) {
       console.error("Error:", error);
     }
  }
);
