import React from "react";
import LoginCard from "../component/LoginCard";
import { Container, Typography } from "@mui/material";
import TitleGrid from "../component/TitleGrid";

const Profile = ({ authenticated, setAuthenticated, setUserID, setUserName, userName }) => {
  return (
    <Container maxWidth="md">
      <TitleGrid
        title={"Profile"}
        image={
          "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        imageText={"main image description"}
        color={"#dfc920"}
      />
      {!authenticated && (
        <LoginCard setAuthenticated={setAuthenticated} setUserID={setUserID} setUserName={setUserName} />
      )}

      {authenticated && <Typography variant="h3" textAlign="center">{"Welcome back " + userName}</Typography>}
    </Container>
  );
};

export default Profile;
