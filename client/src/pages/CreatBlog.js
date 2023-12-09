import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form
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
        alert("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          margin={"auto"}
          mt={"40px"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color={"gray"}
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, ml: 4, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            sx={{ mb: 2, ml: 4, mr: 4 }}
            varient="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, ml: 4, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            sx={{ mb: 2, ml: 4, mr: 4 }}
            varient="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, ml: 4, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            sx={{ mb: 2, ml: 4, mr: 4 }}
            varient="outlined"
            required
          />
          <Button
            sx={{ mt: 2, mb: 4, ml: 10, mr: 10 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            SUBMIT BLOG
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreatBlog;
