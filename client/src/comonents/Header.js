
import React from "react";
import logo from '../comonents/logo.png';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // Global_State
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [value, setValue] = useState();

  
  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#152E58" }}>
        <Toolbar>
        <Box sx={{ display: "flex",alignItems: "center" }}>
        {/* Add your logo component or image here */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: 150, }}
        />

     
          {isLogin && (
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{ flexGrow: 1 ,marginLeft: 55}}
            >
              <Tab
              
                label="BLOGS"
                component={Link}
                to="/blogs"
                sx={{"&:hover": { color: "#fff" } }}
              />
              <Tab
                label="MY BLOGS"
                component={Link}
                to="/my-blogs"
                sx={{ "&:hover": { color: "#fff" } }}
              />
              <Tab
                label="CREATE BLOG"
                component={Link}
                to="/create-blog"
                sx={{ "&:hover": { color: "#fff" } }}
              />
            </Tabs>
          )}
          </Box >

          <Box display={"flex"} alignItems="center"  marginLeft="auto">
            {!isLogin ? (
              <>
                <Button sx={{ color: "white" }} component={Link} to="/login">
                  Login
                </Button>
                <Button
                  sx={{ color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{ color: "white", marginLeft: "auto" }}
              >
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
