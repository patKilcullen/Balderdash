import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Users/patkilcullen/Desktop/Balderdash/server/db/awspg.js


export const askAI = createAsyncThunk(
  "/askAI",
  async ({ word, definition }) => {
     try {
       const response = await fetch("/api/openAI/", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ word, definition }),
       });

       console.log("RESPONSE IN THUNK: ", response);
       const data = await response.json();
        console.log("DATE IN THUNK: ", data.trim());
       return data.trim()
   
     } catch (error) {
       console.error("Error:", error);
     }
  }
);
