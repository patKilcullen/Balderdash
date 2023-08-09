import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// SLICES/STATE REDUCERS, ETC.
import { fetchSingleUser } from "../users/singleUserSlice";

// COMPONENTS
import Navbar from "../navbar/Navbar";
import CardFront from "../cards/CardFront";

// MATERIAL UI
import { Button, Typography } from "@mui/material";

const UserGames = () => {
  // COMPONENT STATE
  const [displayGames, setDisplayGames] = useState([]);

  const games = useParams();
  const userId = useSelector((state) => state.auth.me.id);

  const dispatch = useDispatch();

  //  CHECK WHICH COLLECTION OF GAMES NEEDS TO BE RENDERED sets them to desplayGames
  useEffect(() => {
    games.games === "all-games"
      ? dispatch(fetchSingleUser(userId)).then((res) => {
          setDisplayGames(res.payload.games);
        })
      : games.games === "started-games"
      ? dispatch(fetchSingleUser(userId)).then((res) => {
          setDisplayGames(
            res.payload.games.filter((game) => game.started === true)
          );
        })
      : games.games === "unstarted-games"
      ? dispatch(fetchSingleUser(userId)).then((res) => {
          setDisplayGames(
            res.payload.games.filter((game) => game.started === false)
          );
        })
      : null;
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Navbar></Navbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {" "}
          {/* map through array of displayGames */}
          {displayGames && displayGames.length
            ? displayGames.map((game) => (
                <Link to={`/games/${game.id}`}>
                  <CardFront
                    side={"back"}
                    half={{
                      first: `${
                        game.name.length < 20
                          ? game.name
                          : game.name.slice(0, Math.ceil(game.name.length / 2))
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
      </div>
    </div>
  );
};

export default UserGames;
