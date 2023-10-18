import React from "react";
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import About from "./pages/About";
import Home from "./pages/Home";
import { Link } from "react-router-dom";

const Navbar = () => {
  const pages = [
    { label: "Home", path: "/", component: Home },
    { label: "About", path: "/about", component: About }
    
  ];

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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },  justifyContent: "flex-end" }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

//ref https://javascript.works-hub.com/learn/how-to-create-a-responsive-navbar-using-material-ui-and-react-router-f9a01
