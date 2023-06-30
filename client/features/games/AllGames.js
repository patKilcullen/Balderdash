import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchAllGames,
  selectAllGames,
  fetchAllUserGames,
} from "./allGamesSlice";

import { fetchSingleUser, selectSingleUser } from "../users/singleUserSlice";

import CreateGame from "./CreateGame";
import SingleGame from "./SingleGame";
import Navbar from "../navbar/Navbar";

import socket from "socket.io-client";

const AllGames = () => {
  // userID should be props????????
  const userId = useSelector((state) => state.auth.me.id);
  const games = useSelector(selectAllGames);

  const dispatch = useDispatch();

  const user = useSelector(selectSingleUser);



  const [gamesX, setGamesX] = useState([]);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, []);

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);


  const clientSocket = socket.connect("http://localhost:8080");

  // when games changes, when add new games, send games to socket so other players see new game
  useEffect(() => {
    clientSocket.emit("send_new_game", games);
  }, [games]);

  clientSocket.on("receive_new_game", (data) => {
    setGamesX(data);
  });
  return (
    <div>
      
      <Link to="/create-game">
        {" "}
        <button>Create a NEW GAME</button>
      </Link>
      <div id="games">
     
        
        <div className="game-sort">
          <div className="game-sort">All Public Games</div>
          {gamesX && gamesX.length 
          
            ? gamesX.filter((game) => game.publicX).map((game) => (
                <Link to={`/games/${game.id}`}>
                  {" "}
                  <div>{game.name}</div>
                </Link>
              ))
            : null}
        </div>


        <div className="game-sort">
          <div>All Users Games</div>
          {user.games
            ? user.games.map((game) => (
                <Link to={`/games/${game.id}`}>
                  {" "}
                  <div>{game.name}</div>
                </Link>
              ))
            : null}
        </div>

        {/* HEREEEEEEEEEEEE */}

        <div className="game-sort">
          <div>Unstarted Games</div>
          {user.games
            ? user.games
                .filter((game) => game.started === false)
                .map((game) => {
                  return (
                    <Link to={`/games/${game.id}`}>
                      {" "}
                      <div>{game.name}</div>
                    </Link>
                  );
                })
            : null}
        </div>

        <div className="game-sort">
          <div>Started Games</div>
          {user.games
            ? user.games
                .filter((game) => game.started === true)
                .map((game) => {
                  return (
                    <Link to={`/games/${game.id}`}>
                      {" "}
                      <div>{game.name}</div>
                    </Link>
                  );
                })
            : null}
        </div>

        <div className="game-sort">
          <div>Owned Games</div>
          {user.games
            ? user.games
                .filter((game) => game.ownerId === userId)
                .map((game) => {
                  return (
                    <Link to={`/games/${game.id}`}>
                      {" "}
                      <div>{game.name}</div>
                    </Link>
                  );
                })
            : null}
        </div>
      </div>

      
    </div>
  );
};

export default AllGames;
