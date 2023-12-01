const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
  userBlogController,
} = require("../controller/blogController");

//router object
const router = express.Router();

//routes
//Get || all Blogs
router.get("/all-blog", getAllBlogController);

//post || create Blogs
router.post("/create-blog", createBlogController);

//put || update Blogs
router.put("/update-blog/:id", updateBlogController);

//delete || delete
router.delete("/delete-blog/:id", deleteBlogController);

//Get || single Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//Get || User Blogs
router.get("/user-blog/:id", userBlogController)

module.exports = router;
