import { Container, Link, Typography } from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";
import Customiser from "../component/Customiser";

const Settings = ({
  authenticated,
  setAuthenticated,
  setUserID,
  userID,
  setColor,
  loggedEmail,
  color,
  fontSize,
  setFontSize,
  setWebTheme,
  webTheme,
}) => {
  return (
    <Container maxWidth="md">
      {/* Title Banner for Settings */}
      <TitleGrid
        title={"Settings"}
        image={
          "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        imageText={"main image description"}
        color={"#1dd0e2"}
      />

      {/* If user is logged in then the customisation settings are made available */}
      {authenticated && (
        <Customiser
          setColor={setColor}
          loggedEmail={loggedEmail}
          color={color}
          fontSize={fontSize}
          setFontSize={setFontSize}
          setWebTheme={setWebTheme}
          webTheme={webTheme}
        />
      )}

      {/* Shows the Login link and a message if user not logged in */}
      {!authenticated && (
        <Typography variant="h4" component="h2" textAlign="center">
          <Link href="/profile" color="primary">
            Login
          </Link>{" "}
          to change settings
        </Typography>
      )}
    </Container>
  );
};

export default Settings;
