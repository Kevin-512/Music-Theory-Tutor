import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MuiColorInput } from "mui-color-input";
import axios from "axios";

const Customiser = ({
  color,
  setColor,
  loggedEmail,
  fontSize,
  setFontSize,
  setWebTheme,
  webTheme,
}) => {
  const [value, setValue] = useState(color);
  const [themeDark, setThemeDark] = useState(false);

  // Sets the switch for dark mode to true when the user logs in
  useEffect(() => {
    if (webTheme === "dark"){
      setThemeDark(true);
    }
  }, [webTheme]);

  // Changes the colour theme of the application
  const handleChange = (newValue) => {
    setValue(newValue);
    setColor(newValue);
  };

  // Stores the colour value into the database based on the logged in email
  const updateColor = () => {
    axios
      .patch(`http://localhost:8000/api/update/theme/${loggedEmail}`, {
        color: value,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Restores default colour scheme and updates the database
  const defaultColor = () => {
    setValue("#883bc4");
    setColor("#883bc4");
    axios
      .patch(`http://localhost:8000/api/update/theme/${loggedEmail}`, {
        color: "#883bc4",
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Update font size for corresponding email in database
  const updateFont = () => {
    axios
      .patch(`http://localhost:8000/api/update/font/${loggedEmail}`, {
        textsize: fontSize,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Restores font back to default in database for corresponding email
  const defaultFont = () => {
    setFontSize(14);
    axios
      .patch(`http://localhost:8000/api/update/font/${loggedEmail}`, {
        textsize: 14,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Changes theme of application between light and dark
  const updateTheme = (event) => {
    setThemeDark(event.target.checked);
    if (themeDark === false) {
      setWebTheme("dark");
    } else {
      setWebTheme("light");
    }
  };

  // Stores the theme into database with email as input
  const saveTheme = () => {
    console.log(webTheme);
    axios
      .patch(`http://localhost:8000/api/update/mode/${loggedEmail}`, {
        mode: webTheme,
        textsize: 15,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Restores theme to light mode for logged in user
  const defaultTheme = () => {
    setThemeDark(false);
    setWebTheme("light");
    axios
      .patch(`http://localhost:8000/api/update/mode/${loggedEmail}`, {
        mode: "light",
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="md">
      {/* Create row for colour picker with save and default */}
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography marginRight={5}>Colour</Typography>
        <MuiColorInput format="hex" value={value} onChange={handleChange} />
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" onClick={updateColor}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={defaultColor}>
              Default
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Row for creating dropdown to choose the font size of the application */}
      <Toolbar />
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography marginRight={2} whiteSpace={"nowrap"}>
          Font Size
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Font</InputLabel>
          <Select
            value={fontSize}
            label="Font"
            onChange={(event) => setFontSize(event.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={20}>24</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" onClick={updateFont}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={defaultFont}>
              Default
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Row for changing between light and dark mode */}
      <Toolbar />
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography marginRight={1} whiteSpace={"nowrap"}>
          Dark Mode
        </Typography>
        <Switch
          checked={themeDark}
          onChange={updateTheme}
          inputProps={{ "aria-label": "controlled" }}
        />

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" onClick={saveTheme}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={defaultTheme}>
              Default
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Customiser;
