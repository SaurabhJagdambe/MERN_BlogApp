import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Header = () => {
  // Global_State
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state
  const [value, setvalue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout SuccessFully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setvalue(value)}
              >
                <Tab label="BLOGS" LinkComponent={Link} to="/blogs" />
                <Tab label="MY BLOGS" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="CREATE BLOG"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
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
