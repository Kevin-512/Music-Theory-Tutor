import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
} from "@mui/material";

const Sightreading = () => {
  const [scale, setScale] = React.useState("");
  const scales = [
    "C Major",
    "G Major",
    "D Major",
    "A Major",
    "E Major",
    "F Major",
  ];

  const selectScale = (event) => {
    setScale(event.target.value);
  };

  return (
    <div>
      <h1>SightReading</h1>
      <h1>Select a scale to begin</h1>
      <Box sx={{ maxWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel>Scale</InputLabel>
          <Select
            id="scale-select"
            value={scale}
            label="Scale"
            onChange={selectScale}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Sightreading;
