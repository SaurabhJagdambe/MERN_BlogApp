const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//Get All Blogs
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs Found ",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      Blogcount: blogs.length,
      blogs,
    });
  } catch {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occured while getting all blogs ",
      error,
    });
  }
};

//Create Blogs
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const existingUser = await userModel.findById(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        sucess: false,
        message: "Unable to find user",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Creating Blog",
      error,
    });
  }
};

//Update Blogs
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      sucess: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Updating Blog",
      error,
    });
  }
};

//Single Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Getting Single Blog",
      error,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
   const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog-Deleted!",
    });
          // Problem While deleting Blog  at 6-12min   solves  use 
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Deleting Blog",
      error,
    });
  }
};


// Get User Blog
exports.userBlogController =async (req,res)=>{
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if(!userBlog){
      return res.status(404).send({
        success:false,
        message:'blogs not found with this id'
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,

    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user Blog",
      error,
    
  })
}
}; 

