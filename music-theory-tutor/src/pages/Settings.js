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
}) => {
  return (
    <Container maxWidth="md">
      <TitleGrid
        title={"Settings"}
        image={
          "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        imageText={"main image description"}
        color={"#1dd0e2"}
      />

      {authenticated && (
        <Customiser setColor={setColor} loggedEmail={loggedEmail} />
      )}

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
