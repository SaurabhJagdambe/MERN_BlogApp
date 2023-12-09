import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import {useDispatch} from 'react-redux';
import { authActions } from '../redux/store';

const Login = () => {
  //navigate to login page
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        dispatch(authActions.login())
        alert("User Logged Succesfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin="auto"
          marginTop={10}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={2}
            textAlign={"center"}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>
          <TextField
            placeholder="xyz@email.com"
            margin="normal"
            name="email"
            value={inputs.email}
            type="email"
            required
            onChange={handleChange}
          ></TextField>
          <TextField
            placeholder="Password"
            margin="normal"
            name="password"
            value={inputs.password}
            type="password"
            required
            onChange={handleChange}
          ></TextField>
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }} 
            color="primary"
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login ;