import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../comonents/BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllblogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data && data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllblogs();
  },[]);
  return (
    <diV>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
          id={blog._id}
          isUser={ localStorage.getItem('userId') === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))}
      
    </diV>
  );
};

export default Blogs;
