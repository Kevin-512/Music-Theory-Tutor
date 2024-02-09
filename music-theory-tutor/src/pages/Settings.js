import { Container } from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";

const Settings = () => {
  return (
    <Container>
      <TitleGrid 
        title={"Settings"}
        image={"https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=600"}
        imageText={"main image description"}
        color={"#1dd0e2"}
      />
    </Container>
  );
};

export default Settings;
