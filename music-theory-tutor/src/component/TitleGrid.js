import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// Component for displaying a title banner which can be imported for each page
const TitleGrid = (props) => {
  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: props.color,
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${props.image})`,
      }}
    >
      {/* Code for displaying an image */}
      {
        <img
          style={{ display: "none" }}
          src={props.image}
          alt={props.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.65)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            {/* Properties for displaying a title and a description of the page */}
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              style={{ fontFamily: "monospace", zIndex: 1 }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              style={{ fontFamily: "monospace", zIndex: 1 }}
            >
              {props.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TitleGrid;
