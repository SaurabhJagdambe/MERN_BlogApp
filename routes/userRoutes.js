const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controller/userController");

//router object
const router = express.Router();

//Get all users || Get user
router.get("/allusers", getAllUsers);

//Create  users || Post user
router.post("/register", registerController);

//login users || Post user
router.post("/login", loginController);

module.exports = router;
