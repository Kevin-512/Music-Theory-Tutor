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

const Learn = () => {
  return (
    <Container maxWidth="md">
      {/* Title Banner */}
      <TitleGrid
        title={"Learn"}
        description={"Explore the music theory resources"}
        image={
          "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        imageText={"main image description"}
        color={"#41b638"}
      />
      <Grid container spacing={4}>
        {/* Links to various wikipedia pages */}
        {/* Card linking to Rhythm wiki page */}
        <Grid item={1} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Rhythm"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/804269/pexels-photo-804269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Rhythm
                </Typography>
                <Typography>
                  Discover the foundation of music and the importance of
                  maintaining rhythm
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Links to the Scale wiki page */}
        <Grid item={1} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Scale_(music)"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Scales
                </Typography>
                <Typography>
                  Explore the different scales and the sounds that belong to
                  each one
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Links to the Pitches wikipedia page */}
        <Grid item={3} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Pitch_(music)"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/157534/pexels-photo-157534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Pitches
                </Typography>
                <Typography>
                  Unravel music pitches and the fundamental tones that form
                  melodies and define harmonies
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Links to the Chord wikipedia page */}
        <Grid item={1} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Chord_(music)"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/164737/pexels-photo-164737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Chords
                </Typography>
                <Typography>
                  Learn about the different chords and discover the patterns
                  that make a chord what it is
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Links to the interval wikipedia page */}
        <Grid item={1} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Interval_(music)"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/39396/hourglass-time-hours-sand-39396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Intervals
                </Typography>
                <Typography>
                  Find out more about intervals and why we need them when
                  playing music
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Arpeggio wiki page */}
        <Grid item={2} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea
              component={Link}
              to="https://en.wikipedia.org/wiki/Arpeggio"
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Arpeggios
                </Typography>
                <Typography>
                  Learn about the broken chords called Arpeggios and there
                  importance
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learn;
