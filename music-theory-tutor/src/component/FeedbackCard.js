import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// Create a feedback card which displays the results to a quiz and the correct answer

const FeedbackCard = (props) => {
  let cardColour = "";
  let outcome = "";
  if (props.result === true) {
    cardColour = "#43bc63";
    outcome = "Correct!";
  } else if (props.result === false) {
    cardColour = "#d72928";
    outcome = "Incorrect";
  }

  const card = (
    <div>
      <CardContent>
        <Box sx={{ p: 1 }}>
          <Typography variant="h5" component="div">
            {outcome}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Typography variant="body1">{props.feedback}</Typography>
        </Box>
      </CardContent>
    </div>
  );

  if (props.display) {
    return (
      <Box sx={{ minWidth: 275, maxWidth: 500 }}>
        <Card
          variant="outlined"
          style={{ backgroundColor: cardColour, color: "white" }}
        >
          {card}
        </Card>
      </Box>
    );
  }
};

export default FeedbackCard;
