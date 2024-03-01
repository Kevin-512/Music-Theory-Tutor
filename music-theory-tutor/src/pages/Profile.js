import React, { useEffect, useState } from "react";
import LoginCard from "../component/LoginCard";
import { Button, Container, Toolbar, Typography } from "@mui/material";
import TitleGrid from "../component/TitleGrid";
import axios from "axios";
import ResultsTable from "../component/ResultsTable";

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
  setWebTheme
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
          setFontSize(data.data[0].textsize);
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  };

  const logout = () => {
    setUserID(0);
    setAuthenticated(false);
    setUserName("");
    setLoggedEmail("");
    setColor("#883bc4");
    setFontSize(14);
    setWebTheme("light");
  }

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
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3" textAlign="center">
            {"Welcome back " + userName}
          </Typography>
          <Button variant="contained" justifyContent="center" onClick={logout}>Logout</Button>
        </Container>
      )}
      <Toolbar />
      {authenticated && (
        <Container>
          <Typography variant="h4" textAlign="center">
            {"Email: " + loggedEmail}
          </Typography>
        </Container>
      )}
      <Toolbar />
      {authenticated && (
        <Container>
          <Typography variant="h4" textAlign="center">
            History
          </Typography>
          <ResultsTable userID={userID} />
        </Container>
      )}
    </Container>
  );
};

export default Profile;
