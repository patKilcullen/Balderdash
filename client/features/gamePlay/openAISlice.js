import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





export const askAI = createAsyncThunk(
  "/askAI",
  async ({ word, definition }) => {
     try {
       const response = await fetch("/api/openAI", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ word, definition }),
       });

       const data = await response.json();
       return data
   
     } catch (error) {
       console.error("Error:", error);
     }
  }
);
