import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import Main from '../features/main/Main';
import CreateGame from '../features/games/CreateGame';
import SearchGame from '../features/games/SearchGame';
import AllGames from '../features/games/AllGames';
import SingleGame from '../features/games/SingleGame';
import UserGames from '../features/games/UserGames';

import { me } from './store';


const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
 

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {/* LOGGED IN ROUTES */}
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          {/* right not home is basically all games componenet, might want to mkae it home screen */}
          <Route to="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:id" element={<SingleGame />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/search-game" element={<SearchGame />} />
          <Route path="/user-games/:games" element={<UserGames />} />
        </Routes>
      ) : (
        // NOt LOGGED IN ROUTES
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          {/* <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          /> */}
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
