import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios'
const Register = () => {
  //navigate to login page
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    username: "",
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

  // handle submit
   
  // const data = {
  //          username: inputs.name,
  //       email: inputs.email,
  //       password: inputs.password,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}  = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      
      if (data.success) {
        alert("User Register Succesfully");
        navigate("/login");
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
            Register
          </Typography>
          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            name="name"
            type="text"
            required
          ></TextField>
          <TextField
            placeholder="xyz@email.com"
            margin="normal"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
            required
          ></TextField>
          <TextField
            placeholder="Password"
            margin="normal"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            required
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
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
            // variant="contained"
            color="primary"
          >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
