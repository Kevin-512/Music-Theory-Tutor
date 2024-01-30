import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Results = (props) => {
  const total = props.correct + props.wrong;
  const accuracy = props.correct / total;
  const navigate = useNavigate();

  function onClick() {
    if (props.origin === "SightReading") {
        navigate("/sightreading");
    }else if(props.origin === "Quizzes"){
        navigate("/quizmap");
    }else{
        navigate("/")
    }
  }

  return (
    <div>
      <h2>Results</h2>
      <h3>{"Correct: " + props.correct}</h3>
      <h3>{"Mistakes: " + props.wrong}</h3>
      <h3>{"Accuracy: " + accuracy}</h3>
      <h3>{"Total Answered: " + total}</h3>
      <Button onClick={onClick} variant="contained">
        Return
      </Button>
    </div>
  );
};

export default Results;
