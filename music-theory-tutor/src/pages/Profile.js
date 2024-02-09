import React from "react";
import LoginCard from "../component/LoginCard";
import { Container } from "@mui/material";
import TitleGrid from "../component/TitleGrid";

const Profile = ({ authenticated, setAuthenticated, setUserID }) => {
  if (!authenticated) {
    return (
      <Container>
        <TitleGrid
          title={"Profile"}
          image={
            "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          imageText={"main image description"}
          color={"#dfc920"}
        />
        <LoginCard setAuthenticated={setAuthenticated} setUserID={setUserID} />
      </Container>
    );
  }
  return (
    <Container>
      <p>User is authenticated!</p>
    </Container>
  );
};

export default Profile;
