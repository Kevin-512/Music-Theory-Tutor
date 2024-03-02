import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";
import { Link } from "react-router-dom";

// Page which navigates between Note Reading and Note Listening

const NoteRecognitionSplit = () => {
  return (
    <Container maxWidth="md">
      {/* Banner for title */}
      <TitleGrid
        title={"Note Recognition"}
        description={"Choose between Note Listening and Note Recall"}
        image={
          "https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#dfc920"}
      />
      <Grid container spacing={4} style={{ justifyContent: "center" }}>
        {/* Card that links to the note reading page */}
        <Grid item={1} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea component={Link} to="/sightreading">
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/14990223/pexels-photo-14990223/free-photo-of-close-up-photo-of-a-music-sheet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Note Reading
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

        {/* Card linking to the note listening page */}
        <Grid item={2} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardActionArea component={Link} to="/notelistening">
              <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image="https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Note Listening
                </Typography>
                <Typography>
                  Listen to a pre-determined group of notes and select what you
                  think you can hear to test how good your listening skills are
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoteRecognitionSplit;
