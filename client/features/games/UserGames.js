import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  fetchAllGames,
  selectAllGames,
  fetchAllUserGames,
} from "./allGamesSlice";

import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import CreateGame from "./CreateGame";
import SearchGame from "./SearchGame";
import SingleGame from "./SingleGame";
import Navbar from "../navbar/Navbar";
import CardFront from "../cards/CardFront";

import { Button, Typography } from "@mui/material";

import socket from "socket.io-client";

const UserGames = () => {
  // userID should be props????????
  const userId = useSelector((state) => state.auth.me.id);
   const dispatch = useDispatch();
  // const games = useSelector(selectAllGames);
const games = useParams()
console.log("GAMES FROM USE APARAPAMS: ", games)
const [displayGames, setDisplayGames] = useState([])
console.log("DISPLAY GAMES: ", displayGames)

useEffect(()=>{
games.games === "all-games" ? 

dispatch(fetchSingleUser(userId)).then((res)=>{
   console.log("RES PAY: ", res.payload.games)
  setDisplayGames(res.payload.games)
      })
      
: 
games.games === "started-games" ? 

dispatch(fetchSingleUser(userId)).then((res)=>{
  
  setDisplayGames(res.payload.games.filter((game)=>game.started === true))
      })
      
: 
games.games === "unstarted-games" ? 

dispatch(fetchSingleUser(userId)).then((res)=>{
  
  setDisplayGames(res.payload.games.filter((game)=>game.started === false))
      })
      
:

null
},[])





  return (
    <div style={{height: "100%"}}>
      <Navbar></Navbar>
<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
<div> {displayGames && displayGames.length
            ? displayGames  
                .map((game) => (
                  // <Link to={`/games/${game.id}`}>
                  //   {" "}
                  //   <div>{game.name}</div>
                  // </Link>
                  <Link to={`/games/${game.id}`}>
                    
                    <CardFront
            side={"back"}
            half={{
              first: `${
                game.name.length < 20
                  ? game.name
                  : game.name.slice(
                      0,
                      Math.ceil(game.name.length / 2)
                    )
              }`,
              second:
                game.name.length < 20
                  ? null
                  : game.name.slice(Math.ceil(game.name.length / 2)),
            }}
          ></CardFront>
                    
                    </Link>
                ))
            : "NO GAMES"}
</div>



{/* <Link to="/create-game"><CardFront top={"Create Game"} side={"back"} half={{first: "Create", second:  "Game"}}></CardFront></Link>

<Link to="/search-game"><CardFront top={"Seatch Game"} side={"back"}half={{first: "Find", second:  "Game"}}></CardFront></Link>
<CardFront top={"Create Game"} side={"back"} half={{first: "Started", second:  "Games"}}></CardFront>

<CardFront top={"Seatch Game"} side={"back"}half={{first: "Unstarted", second:  "Games"}}></CardFront> */}
</div>

    </div>
  );
};

export default UserGames;
