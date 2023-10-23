import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      // Colour to place in sx in line below bgcolor: "#993ac5",
      sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          {/* Code for the Title and Logo */}
          <MusicNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            value="/"
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

          {/* Declares a box which holds all the icons appearing in the top right */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {/* Code for each individual button. Listed below for profile and settings */}
            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              value="/profile"
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/settings"
              value="/settings"
            >
              <SettingsIcon />
            </IconButton>
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
