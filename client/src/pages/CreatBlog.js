import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    user:""
  });

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created Successfully");
        window.location.reload();
        navigate("/my-blogs")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width="60%"
        border={3}
        borderRadius={10}
        margin="auto"
        alignItems={'center'}
        mt={4}
        p={4}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#333"
          mb={3}
        >
          Create A Post
        </Typography>
        {["title", "description", "image"].map((field) => (
          <Box key={field} mb={3}>
            <InputLabel sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </InputLabel>
            <TextField
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </Box>
        ))}
        <Button
        
          sx={{ display: 'block',width:'60%',mt:3,margin: 'auto', textAlign:"center"}}
          
          type="submit"
          color="primary"
          variant="contained"
        >
          SUBMIT BLOG
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
