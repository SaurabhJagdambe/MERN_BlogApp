import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Logged Successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        margin="auto"
        marginTop={8}
        padding={4}
        boxShadow="2px 2px 6px 10px rgba(0, 0, 0, 0.1)"
        borderRadius={5}
        textAlign="center"
        sx={{
          ":hover": {
            transform: "scale(1.01)", // Scale up on hover
          },
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase", marginBottom: 3 }}>
          Login
        </Typography>
        <TextField
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          name="email"
          value={inputs.email}
          type="email"
          required
          onChange={handleChange}
        />
        <TextField
          placeholder="Enter your password"
          fullWidth
          margin="normal"
          name="password"
          value={inputs.password}
          type="password"
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 3, borderRadius: 2, backgroundColor: "#152E58",width: "60%" , ":hover": {
            backgroundColor: "#0747B4", 
          }}}
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/register")}
          // fullWidth
          sx={{ marginTop: 2, color: "#1976D2" , ":hover": {
            color: "#0747B4", 
          }}}
        >
          Not a user? Register here
        </Button>
      </Box>
    </form>
  );
};

export default Login;
