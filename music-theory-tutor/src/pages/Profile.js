import React, { useEffect, useState } from "react";
import LoginCard from "../component/LoginCard";
import { Container, Toolbar, Typography } from "@mui/material";
import TitleGrid from "../component/TitleGrid";
import axios from "axios";

const Profile = ({
  authenticated,
  setAuthenticated,
  setUserID,
  setUserName,
  userName,
  setLoggedEmail,
  loggedEmail,
  setColor,
  setFontSize,
  userID,
}) => {

  useEffect(() => {
    console.log(
      "useEffect triggered. Authenticated:",
      authenticated,
      "Logged Email:",
      loggedEmail
    );
    if (authenticated && loggedEmail) {
      fetchSettings(loggedEmail);
    }
  }, [authenticated, loggedEmail]);

  const fetchSettings = (email) => {
    axios
      .get(`http://localhost:8000/api/settings/${email}`)
      .then((response) => {
        const data = response.data;
        if (data.message === "success") {
          setColor(data.data[0].color);
          setFontSize(data.data[0].textsize)
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  };

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
        <LoginCard
          setAuthenticated={setAuthenticated}
          setUserID={setUserID}
          setUserName={setUserName}
          setLoggedEmail={setLoggedEmail}
        />
      )}

      {authenticated && (
        <Typography variant="h3" textAlign="center">
          {"Welcome back " + userName}
        </Typography>
      )}
      <Toolbar />
      {authenticated && (
        <Container>
        <Typography variant="h4" textAlign="center">
          {"Email: " + loggedEmail}
        </Typography>
        <Typography variant="h4" textAlign="center">
        {"ID: " + userID}
      </Typography>
      </Container>
      )}
    </Container>
  );
};

export default Profile;
