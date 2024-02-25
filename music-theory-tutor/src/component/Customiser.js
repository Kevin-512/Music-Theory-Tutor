import { Button, Container } from "@mui/material";
import React from "react";
import { MuiColorInput } from "mui-color-input";
import axios from "axios";

const Customiser = ({ setColor, loggedEmail }) => {
  const [value, setValue] = React.useState("#ffffff");

  const handleChange = (newValue) => {
    setValue(newValue);
    setColor(newValue);
  };

  const updateColor = () => {
    axios
      .patch(`http://localhost:8000/api/update/theme/${loggedEmail}`, { color: value })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <MuiColorInput format="hex" value={value} onChange={handleChange} />
      <Button variant="contained" onClick={updateColor}>
        Save
      </Button>
    </Container>
  );
};

export default Customiser;
