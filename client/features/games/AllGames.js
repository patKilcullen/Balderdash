import React from "react";
import { Link } from "react-router-dom";
import CardFront from "../cards/CardFront";

const AllGames = () => {
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/create-game">
          <CardFront
            top={"Create Game"}
            side={"back"}
            half={{ first: "Create", second: "Game" }}
          ></CardFront>
        </Link>

        <Link to="/search-game">
          <CardFront
            top={"Search Game"}
            side={"back"}
            half={{ first: "Find", second: "Game" }}
          ></CardFront>
        </Link>

        <Link to={`/user-games/all-games`}>
          <CardFront
            side={"back"}
            half={{ first: "All", second: "Games" }}
          ></CardFront>
        </Link>
        <Link to={`/user-games/started-games`}>
          <CardFront
            side={"back"}
            half={{ first: "Started", second: "Games" }}
          ></CardFront>
        </Link>
        <Link to={`/user-games/unstarted-games`}>
          <CardFront
            side={"back"}
            half={{ first: "Unstarted", second: "Games" }}
          ></CardFront>
        </Link>
      </div>
    </div>
  );
};

export default AllGames;
