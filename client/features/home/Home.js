import React from "react";
import { useSelector } from "react-redux";
import Main from "../main/Main";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <Link to={"/main"}>Start a new game</Link>
      {/* <Main /> */}
    </div>
  );
};

export default Home;
