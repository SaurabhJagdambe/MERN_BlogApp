import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  //get blog details
  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setBlog(data?.blog);
          setInputs({
            title: data?.blog.title,
            description: data?.blog.description,
            image: data?.blog.image,
            id: id 
            //user:id
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlogDetails();
  }, [id]);
  console.log(blog)

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);

  return (
    <>
    <form onSubmit={handleSubmit}>
    <Box
      width={"60%"}
      border={4}
      borderRadius={10}
      padding={4}
      margin="auto"
      mt={4}
      boxShadow={"10px 10px 20px #ccc"}
      display="flex"
      flexDirection={"column"}
      marginTop="30px"
    >
      <Typography
      variant="h4"
      textAlign="center"
      fontWeight="bold"
      color="#333"
      mb={3}
      >
        Update A Post
      </Typography>

      <InputLabel
      sx={{ fontSize: "1.2rem", fontWeight: "bold", mb:'3'}}
      >
        Title
      </InputLabel>
      <TextField
        name="title"
        value={inputs.title}
        onChange={handleChange}
        fullWidth
        sx={{mb:3}}
        variant="outlined"
        required
      />
      <InputLabel
      sx={{ fontSize: "1.2rem", fontWeight: "bold", }}
      >
        Description
      </InputLabel>
      <TextField
        name="description"
        value={inputs.description}
        onChange={handleChange}
        fullWidth
        sx={{mb:3}}
        variant="outlined"
        required
      />
      <InputLabel
      sx={{ fontSize: "1.2rem", fontWeight: "bold",mb:'3' }}
      >
        Image URL
      </InputLabel>
      <TextField
        name="image"
        value={inputs.image}
        onChange={handleChange}
        fullWidth
        sx={{mb:3}}
        variant="outlined"
        required
      />

      <Button sx={{ display: 'block',width:'60%',mt:3,margin: 'auto', textAlign:"center"}} type="submit" color="warning" variant="contained">
        UPDATE
      </Button>
    </Box>
  </form>
    </>
  );
};

export default BlogDetails;
