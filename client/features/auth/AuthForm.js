import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { useNavigate } from "react-router-dom";

import Navbar from "../navbar/Navbar";

import {
  Button,
  Box,
  Typography,
  Container,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedForm, setSelectedForm] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const handleSelectForm = (evt) => {
    evt.preventDefault();
    setSelectedForm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      authenticate({
        username: userName,
        password: password,
        method: selectedForm,
      })
    );
  };

  return (
    <>
      <Navbar />
      <Container
        color="secondary"
        component="main"
        maxWidth="sm"
        sx={{ height: "100vh" }}
      >
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
              height: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
                fontSize: "20px",
              }}
            >
              <Typography
                onClick={() => setSelectedForm("login")}
                color={selectedForm === "login" ? "secondary" : "grey"}
                style={{
                  fontSize: "20px",
                  fontWeight: selectedForm === "login" ? "bold" : "none",
                  textDecoration:
                    selectedForm === "login" ? "underline" : "none",
                }}
              >
                Login In
              </Typography>
              <Typography
                onClick={() => setSelectedForm("signup")}
                color={selectedForm === "signup" ? "secondary" : "grey"}
                style={{
                  fontSize: "20px",
                  fontWeight: selectedForm === "signup" ? "bold" : "none",
                  textDecoration:
                    selectedForm === "signup" ? "underline" : "none",
                }}
              >
                Sign Up
              </Typography>
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
            ></Typography>
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
                onChange={(evt) => setUserName(evt.target.value)}
                type="text"
                required
              />
              <div>
                <label htmlFor="username"></label>
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
                onChange={(evt) => setPassword(evt.target.value)}
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
            {error ? <div style={{ color: "red" }}>{error}</div> : null}
          </Box>
        </Box>
        <Typography>{error && <div> {error} </div>}</Typography>
      </Container>
    </>
  );
};

export default AuthForm;
