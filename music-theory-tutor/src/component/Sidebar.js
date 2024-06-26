import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
  Container,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    // Declares the box for the side of the page
    <Container maxWidth="md">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {/* Dont remove toolbar!!! Generates the padding so that the page is correctly calibrated */}
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            {/* Lists the Learn, Quiz and Note Recognition for navigating between pages */}
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/learn" value="/learn">
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Learn" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/quizmap" value="/quizmap">
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quizzes" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/sightreading"
                  value="/sightreading"
                >
                  <ListItemIcon>
                    <AudiotrackIcon />
                  </ListItemIcon>
                  <ListItemText primary="Note Reading" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/notelistening"
                  value="/notelistening"
                >
                  <ListItemIcon>
                    <HeadphonesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Note Listening" />
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/recognitionselect"
                  value="/recognitionselect"
                >
                  <ListItemIcon>
                  <AudiotrackIcon />
                  </ListItemIcon>
                  <ListItemText primary="Note Recognition" />
                </ListItemButton>
              </ListItem> */}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Container>
  );
};

export default Sidebar;
