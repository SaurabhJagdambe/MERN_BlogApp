import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
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
        boxShadow="2px 2px 6px 10px rgba(0, 0, 0, 0.1)"
        padding={3}
        borderRadius={5}
        textAlign="center"
        sx={{
          ":hover": {
            transform: "scale(1.01)", // Scale up on hover
          },
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase", marginBottom: 3 }}>
          Register
        </Typography>
        <TextField
          placeholder="Username"
          fullWidth
          margin="normal"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          type="text"
          required
        />
        <TextField
          placeholder="Email"
          fullWidth
          margin="normal"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          placeholder="Password"
          fullWidth
          margin="normal"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          type="password"
          required
        />
        <Button
          type="submit"
          fullWidth
          sx={{ borderRadius: 3, marginTop: 3 ,backgroundColor:'#152E58',width: "60%", 
          ":hover": {
            backgroundColor: "#0747B4", 
          },}}
          variant="contained"
      
          
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/login")}
          fullWidth
          sx={{ borderRadius: 3, marginTop: 3, color: "#1976D2" ,width: "80%",
          ":hover": {
            color: "#0747B4", 
          }}}
        >
          Already registered? Login here
        </Button>
      </Box>
    </form>
  );
};

export default Register;
