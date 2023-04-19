

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET ALL GAMES
export const fetchSingleUser = createAsyncThunk(
    "singleUser",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/users/${id}`);
       console.log("DATAT IN THIUNKDDDDDDDDDDD:", data)
        return data;
      } catch (error) {
        console.log("ERROR IN SINBGLE User THUNK: ", error);
      }
    }
  );


// CREATE A User 
// might make more sense if this is here instead of all Users
//   export const createUser = createAsyncThunk(
//     "createUser",
//     async ({userId, name, rounds, winner, started, complete}) => {
//         console.log("HIT CREAT EUser THUNKKKKK", name, rounds)
//       try {
//         const { data } = await axios.post("/api/Users",{userId, name, rounds, winner, started, complete});
      
//         return data;
//       } catch (error) {
//         console.log("ERROR IN CREAT User THUNK: ", error);
//       }
//     }
//   );



const singleUserSlice = createSlice({
name: "singleUser",
initialState: {},
reducers: {},
extraReducers: (builder)=>{
    builder.addCase(fetchSingleUser.fulfilled, (state, action)=>{
        console.log("SINGLE USER ACTION PAYLOAD: ")
        return action.payload
    })
   
}

})

export const selectSingleUser = (state)=>{
    return state.singleUser
}

export default singleUserSlice.reducer