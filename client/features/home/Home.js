import React from "react";
import { useSelector } from "react-redux";
import Main from "../main/Main";
import { Link } from "react-router-dom";

import AllGames from "../games/AllGames";

import CreateRound from "./CreateRound";
import Navbar from "../navbar/Navbar";

import { Typography, Divider } from '@mui/material';
/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div >
      <Navbar></Navbar>
      {/* <Typography id = "title" color="secondary"sx={{fontWeight: "bold", }}>Welcome to BALDERDASH, {username}</Typography> */}
      {/* <Divider  sx={{ border: "2px solid #571122", width: "95%", marginTop: "-15px", boxShadow: "4px 4px #558ABB"} } ></Divider> */}
      

      
      {/* <Link to={"/main"}>Start a new game</Link> */}
<AllGames></AllGames>


      {/* <Main /> */}
    </div>
  );
};

export default Home;
