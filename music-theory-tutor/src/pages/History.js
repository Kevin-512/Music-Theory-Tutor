import { Container, Link, Typography } from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";
import ResultsTable from "../component/ResultsTable";

const History = ({authenticated, userID}) => {
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
    
    {authenticated && <ResultsTable userID={userID}/>}
    
    {!authenticated && <Typography  variant="h4" component="h2" textAlign="center">
    <Link href="/profile" color="primary">Login</Link> to view your history
      </Typography>}
      
    </Container>
  );
};

export default History;
