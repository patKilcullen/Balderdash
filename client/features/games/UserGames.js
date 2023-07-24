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
      
: console.log("FUCK a doo")
},[])



// useEffect(() => {
//   dispatch(fetchSingleUser(userId)).then((res)=>{
//     // console.log("RES PAY: ", res.payload.games)
//     setAllUserGames(res.payload.games)
//         })
// }, []);


  // const user = useSelector(selectSingleUser);

  // const [gamesX, setGamesX] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchAllGames());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchSingleUser(userId));
  // }, []);

  // const clientSocket = socket.connect("http://localhost:8080");

  // when games changes, when add new games, send games to socket so other players see new game
  // useEffect(() => {
  //   clientSocket.emit("send_new_game", games);
  // }, [games]);

  // clientSocket.on("receive_new_game", (data) => {
  //   setGamesX(data);
  // });

  return (
    <div style={{height: "100%"}}>
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
            : null}
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
