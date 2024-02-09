import { Container } from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";

const History = () => {
  return (
    <Container maxWidth="md">
      <TitleGrid 
        title={"History"}
        description={
          "Check your past results"
        }
        image={"https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        imageText={"main image description"}
        color={"#a268d3"}
      />
    </Container>
  );
};

export default History;
