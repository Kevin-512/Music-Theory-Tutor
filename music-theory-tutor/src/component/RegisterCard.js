import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

const RegisterCard = () => {
  const [displayMessage, setDisplayMessage] = useState("");
  async function registerUser(details) {
    return fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const response = await registerUser({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log({
      response,
    });
    if (response.message === "success"){
      setDisplayMessage("Registration Successful")
    }else{
      setDisplayMessage("Fields Missing or Incorrect Format")
    }
  };

  return <Container component="main" maxWidth="xs">
  <CssBaseline />
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <AppRegistrationOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
        <Typography style={{ color: 'red' }} variant="body2" color="text.secondary" align="right">{displayMessage}</Typography>
      </Grid></Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/profile" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>;
};

export default RegisterCard;
