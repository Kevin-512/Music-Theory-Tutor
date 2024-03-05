//Reference https://github.com/mui/material-ui/blob/v5.15.7/docs/data/material/getting-started/templates/album/Album.js

import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TitleGrid from "../component/TitleGrid";

// Creates a home page which is the first access point and can be reached by pressing the title icon

const Home = () => {
  return (
    <Container maxWidth="md">
      {/* Banner contianing Home title */}
      <TitleGrid
        title={"Home"}
        image={
          "https://images.pexels.com/photos/164935/pexels-photo-164935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#44e41b"}
      />
      {/* Group of grids for navigation to main features - Quiz, Note Recognition and Learning */}
      <Grid container spacing={4}>
        <Grid item={true} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea component={Link} to="/learn">
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/5939401/pexels-photo-5939401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              {/* Card that links to the learn page */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Learn
                </Typography>
                <Typography>
                  Find links to useful resources to boost your music theory
                  knowledge before you take quizzes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item={true} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea component={Link} to="/quizmap">
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              {/* Card linking to Quizzes page */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Quizzes
                </Typography>
                <Typography>
                  Find quizzes for every music scale and test your knowledge to
                  see how well you know them
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item={true} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea component={Link} to="/recognitionselect">
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Card linking to Not Recognition page */}
                <Typography gutterBottom variant="h5" component="h2">
                  Note Recognition
                </Typography>
                <Typography>
                  Find yourself in a time restrictive situation where you'll
                  need to correctly read the notes off a stave or test your note
                  listening skills
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
