import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import Main from '../features/main/Main';
import CreateGame from '../features/games/CreateGame';
import AllGames from '../features/games/AllGames';
import SingleGame from '../features/games/SingleGame';

import { me } from './store';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
 

  const dispatch = useDispatch();

  // REFRESH => dispatch(me(username));
  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          {/* right not home is basically all games componenet, might want to mkae it home screen */}
          <Route to="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />

          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:id" element={<SingleGame />} />
          <Route path="/create-game" element={<CreateGame />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
