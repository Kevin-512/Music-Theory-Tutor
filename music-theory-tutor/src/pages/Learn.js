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

const Learn = () => {
  return (
    <div style={{ paddingTop: "40px" }}>
      <h1>Learn</h1>
      <Container>
        <Grid container spacing={4}>
          <Grid item={1} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/learn">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
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

          <Grid item={2} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/quizmap">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Quizzes
                  </Typography>
                  <Typography>
                    Find quizzes for every music scale and test your knowledge
                    to see how well you know them
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item={3} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/sightreading">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Sight Reading
                  </Typography>
                  <Typography>
                    Find yourself in a time restrictive situation where you'll
                    need to correctly read the notes off a stave as quickly as
                    possible
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item={1} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/learn">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
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

          <Grid item={1} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/learn">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
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

          <Grid item={1} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea component={Link} to="/learn">
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
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

        </Grid>
      </Container>
    </div>
  );
};

export default Learn;
