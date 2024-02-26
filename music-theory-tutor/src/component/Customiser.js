import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { MuiColorInput } from "mui-color-input";
import axios from "axios";

const Customiser = ({
  color,
  setColor,
  loggedEmail,
  fontSize,
  setFontSize,
}) => {
  const [value, setValue] = React.useState(color);

  const handleChange = (newValue) => {
    setValue(newValue);
    setColor(newValue);
  };

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

  const defaultFont = () => {
    setFontSize(14)
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

  return (
    <Container maxWidth="md">
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
    </Container>
  );
};

export default Customiser;
