import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import { useNavigate } from "react-router-dom";

import Navbar from '../navbar/Navbar';

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// // import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { fontSize, height } from "@mui/system";
// import Card from "@mui/material/Card";



import {Button, Box,Typography ,Container, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [selectedForm, setSelectedForm] = useState("login")
const [userName, setUserName] = useState("")
const [password, setPassword] = useState("")

console.log("password: ", password)

const handleSelectForm = (evt) =>{
  evt.preventDefault();
  setSelectedForm(evt.target.value)
}

  const handleSubmit = (evt) => {
    evt.preventDefault();

console.log("HANDEL SUB<IT, ", selectedForm, userName, password)
    // const formName = selectedForm;

    // const username = evt.target.username.value;
    //  const password = evt.target.password.value;
 
    // dispatch(authenticate({ username, password, method: formName }));
    dispatch(authenticate({ username: userName, password: password, method: selectedForm }));
  };

  return (


    <Container
      color="secondary"
      component="main"
      maxWidth="sm"
      sx={{ height: "100vh" }}
    ><Navbar/>

{/* <Card
          sx={{
            padding: "10px",
            backgroundColor: "#e6e8dc", 
            height: "95%",
            width: "90%",
            // borderRadius: !hidden ? "50px" : "null",
       
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            border: "2px solid black",
     
          }}
        >
          
         
            <div
              style={{
                minHeight: "600px",
                minWidth: "110%",
                display: "flex",
                flexDirection: "column",
             
                position: "relative"
                
              }}
            > */}


      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#88ebe6",
          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",
        }}
      >
        <Box
        sx={{
        
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#e6e8dc",
          padding: "1em 1em",
          borderRadius: "50px",
          border: "5px solid black",
          boxShadow: "20",
          fontWeight: "bold",
          height: "100%"
        }}
      >
   

        <Box style={{display: "flex", justifyContent: "space-between", gap: "30px", fontSize: "20px"}}>
<Typography onClick={()=>setSelectedForm("login")}color={selectedForm === "login" ? "secondary" : "grey"} style={{ fontSize: "20px", fontWeight: selectedForm === "login" ? "bold" : "null", textDecoration: selectedForm === "login" ? "underline" : "null"}}>Login In</Typography>
<Typography  onClick={()=>setSelectedForm("signup")} color={selectedForm === "signup" ? "secondary" : "grey"}style={{ fontSize: "20px", fontWeight: selectedForm === "signup" ? "bold" : "null", textDecoration: selectedForm === "signup" ? "underline" : "null"}}>Sign Up</Typography>
        </Box>
        
        <Typography
          color="secondary"
          component="h1"
          variant="h4"
          sx={{
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          
        </Typography>
        <Box
          component="form"
         onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
    
          <Typography
            color="black"
            component="h2"
            variant="h5"
            sx={{ fontWeight: "bold" }}
            htmlFor="username"
            
          >
            Username:
          </Typography>
          <input
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "50px",
              fontWeight: "bold",
              font: "200px",
              width: "100%",
              height: "50px",
              fontSize: "20px",
            }}
            onChange={(evt)=> setUserName(evt.target.value)}
          

            type="text"
            // name="username"
            // value={gameName}
            // onChange={(e) => setGameName(e.target.value)}
            required
          />
          <div>
          <label htmlFor="username">
            {/* <small>Username</small> */}
          </label>
          {/* <input name="username" type="text" /> */}
         </div>
  

          <Typography
            color="black"
            component="h2"
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            Password:
          </Typography>
          <input
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "50px",
              width: "100%",
              height: "50px",
              fontSize: "20px",
            }}
            type="password"
            name="rounds"
            onChange={(evt)=> setPassword(evt.target.value)}
            // value={rounds}
            // onChange={(e) => setRounds(parseInt(e.target.value))}
          />
        
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              height: "60px",
              fontSize: "1.25rem",
              boxShadow: "20",
              border: "2px solid black",
              borderRadius: "25px",
            }}
            color="primary"
          
          >
            <Typography
              color="secondary"
              component="h2"
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
             {selectedForm === "login" ? "Log In" : "Sign Up"}
            </Typography>
          </Button>
        
        </Box>
        {/* </Card> */}
     
        {error ? <div style={{ color: "red" }}>{error}</div> : null}
      </Box>
      </Box>
      {/* </div>
      </Card> */}
      <Button type="button" color='secondary' sx={{textDecoration: "underline", fontWeight: "bold"}} onClick={()=> navigate('/home')}>Home</Button>
      <Typography>{error && <div> {error} </div>}</Typography>
    </Container>


    // <div style={{  overflow: "visible", height: "100vh"}}>
    //   <Navbar/>
      
    //   <form onSubmit={handleSubmit} name={name}>
    //   <select value={selectedForm} onChange={handleSelectForm}>
    //       <option  value={"login"} >Log In</option>
    //       <option  value={"signup"}>Sign Up</option>
    //       </select>
    //     <div>
    //       <label htmlFor="username">
    //         <small>Username</small>
    //       </label>
    //       <input name="username" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
        
    //     <div>
        
    //       <button type="submit">{selectedForm === "login" ? "Log In" : "Sign Up"}</button>
    //     </div>
    //     {error && <div> {error} </div>}
    //   </form>
    // </div>
  );
};

export default AuthForm;
