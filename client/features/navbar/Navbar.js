import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Typography, Divider } from '@mui/material';


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
     <Card sx={{ boxShadow: "20", border: "2px solid black"}}>
      <Card   sx={{ 
    padding: "10px",
        // color: "black",
         backgroundColor: "#88ebe6"
     }} > 
     <Card id = "header" color="seconday" sx={{ boxShadow: "20", padding: "10px"}}>
      <Typography id = "title" color="secondary"sx={{fontWeight: "bold", }}>BALDERDASH</Typography>
      <Divider  sx={{ border: "2px solid #571122", width: "95%", marginTop: "-15px", boxShadow: "4px 4px #558ABB"} } ></Divider>
      <nav id="nav">
        {isLoggedIn ? (
          <div >
            {/* The navbar will show these links after you log in */}
            
            <Button type="button" color='secondary' sx={{textDecoration: "underline", fontWeight: "bold"}} onClick={()=> navigate('/home')}>Home</Button>
            <Button type="button" color='secondary' sx={{textDecoration: "underline", fontWeight: "bold"}} onClick={logoutAndRedirectHome}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link> */}
          </div>
        )}
      </nav>
      <hr />
      </Card>
      </Card>
     </Card>
  );
};

export default Navbar;
