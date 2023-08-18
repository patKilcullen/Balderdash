import React from "react";
import { useSelector } from "react-redux";


import AllGames from "../games/AllGames";

import CreateRound from "./CreateRound";
import Navbar from "../navbar/Navbar";

import { Typography, Divider } from "@mui/material";
/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <Navbar></Navbar>
      <Typography id="title" color="secondary" sx={{ fontWeight: "bold"}} >
        Welcome, {username}
      </Typography>
      <AllGames></AllGames>

    </div>
  );
};

export default Home;
