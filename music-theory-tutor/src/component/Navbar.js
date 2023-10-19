import React from "react";
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Home from "../pages/Home";
import About from "../pages/About";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Code for the Title and Logo */}
          <MusicNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MUSIC THEORY TUTOR
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Tabs
              aria-label="Navigation Tabs"
              indicatorColor="secondary"
              textColor="inherit"
            >
              <Tab 
                label={"Home"}
                component={Link}
                to="/"
                value="/" />
              <Tab
                label={"About"}
                component={Link}
                to="/about"
                value="/about"
              />
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

//ref 
// https://javascript.works-hub.com/learn/how-to-create-a-responsive-navbar-using-material-ui-and-react-router-f9a01
// https://github.com/marmelab/react-admin/blob/master/examples/crm/src/Header.tsx