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
  setWebTheme,
}) => {
  // Retrieves the email from the database when the user logs in
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

  // Retrieves the color and font settings of the user that logged in
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

  // Clears all variables when the user presses the logout
  const logout = () => {
    setUserID(0);
    setAuthenticated(false);
    setUserName("");
    setLoggedEmail("");
    setColor("#883bc4");
    setFontSize(14);
    setWebTheme("light");
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

      {/* Diplays the login form if the user hasn't logged in */}
      {!authenticated && (
        <LoginCard
          setAuthenticated={setAuthenticated}
          setUserID={setUserID}
          setUserName={setUserName}
          setLoggedEmail={setLoggedEmail}
        />
      )}

      {/* If the user is logged in, display the following */}
      {authenticated && (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logout button and welcome message */}
          <Typography variant="h3" textAlign="center">
            {"Welcome back " + userName}
          </Typography>
          <Button variant="contained" justifyContent="center" onClick={logout}>
            Logout
          </Button>
        </Container>
      )}
      <Toolbar />
      {/* Shows the user's email to know what account they are logged in with */}
      {authenticated && (
        <Container>
          <Typography variant="h4" textAlign="center">
            {"Email: " + loggedEmail}
          </Typography>
        </Container>
      )}
      <Toolbar />
      {/* Displays the user's history table once they login */}
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
