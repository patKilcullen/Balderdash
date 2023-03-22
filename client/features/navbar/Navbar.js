import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Card id = "header" color="primary">
      <h1 id = "title">BALDERDASH</h1>
      <nav id="nav">
        {isLoggedIn ? (
          <div >
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </Card>
  );
};

export default Navbar;
