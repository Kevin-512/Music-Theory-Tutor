import { Button, Container, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Results = (props) => {
  const total = props.correct + props.wrong;
  const accuracy = props.correct / total;
  const navigate = useNavigate();
  const result = [
    { name: "Correct", value: props.correct },
    { name: "Wrong", value: props.wrong },
  ];
  const COLORS = ["#47b86d", "#dc2a23"];
  const data = {
    userID: props.userID,
    quizType: "",
    keySig: props.keySig,
    score: props.correct,
    time: "",
  };

  // Returns the user back to the quiz they were taking
  function onClick() {
    if (props.origin === "SightReading") {
      navigate("/sightreading");
      if (props.userID !== 0) {
        data.quizType = "Note Reading";
        data.time = props.time;
        handleButtonClick();
      }
    } else if (props.origin === "Quizzes") {
      navigate("/quizmap");
      if (props.userID !== 0) {
        data.quizType = "Quiz";
        handleButtonClick();
      }
    } else if (props.origin === "NoteListening") {
      navigate("/notelistening");
      if (props.userID !== 0) {
        data.quizType = "Note Listening";
        handleButtonClick();
      }
    } else {
      navigate("/");
    }
  }

  // Records the user's results in the database
  const handleButtonClick = () => {
    axios
      .post("http://localhost:8000/api/record/results", data)
      .then(function (response) {
        console.log("Response:", response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  if (props.origin === "SightReading" || props.origin === "Quizzes") {
    return (
      <Container>
        <h2>Results</h2>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <ResponsiveContainer width="50%" height={250}>
            {/* Display a pie chart that shows correct/incorrect responses */}
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={result}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {result.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Using text to represent results of the user */}
        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#5cd972",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Correct"}</span>
          <span>{props.correct}</span>
        </Typography>

        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#e5554b",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Mistakes"}</span>
          <span>{props.wrong}</span>
        </Typography>

        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#d0f32f",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Accuracy"}</span>
          <span>{(accuracy * 100).toFixed(3) + "%"}</span>
        </Typography>

        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#edb74e",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Total Answered"}</span>
          <span>{total}</span>
        </Typography>

        <Toolbar />
        <Button onClick={onClick} variant="contained">
          Return
        </Button>
      </Container>
    );
  } else if (props.origin === "NoteListening") {
    let correctArray = props.correct.split(",");
    let answerArray = props.answer.split(",");
    let answerNoOctave = [];
    let answeredCorrectly = 0;

    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i] === correctArray[i]) {
        answeredCorrectly += 1;
      }
    }

    for (let i = 0; i < answerArray.length; i += 1) {
      let character = answerArray[i][0];
      answerNoOctave.push(character);
    }

    data.score = (answeredCorrectly / correctArray.length) * 100;

    return (
      <Container maxWidth="md">
        <Toolbar />
        <Toolbar />
        
        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#5cd972",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Correct Answer"}</span>
          <span>{props.correctNoOctave.replace(/,/g, ' ')}</span>
        </Typography>

        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#f1c97a",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Your Answer"}</span>
          <span>{answerNoOctave.join(" ")}</span>
        </Typography>

        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#d1ec66",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <span>{"Accuracy"}</span>
          <span>{(answeredCorrectly / correctArray.length) * 100 + "%"}</span>
        </Typography>

        <Toolbar />
        <Button onClick={onClick} variant="contained">
          Return
        </Button>
      </Container>
    );
  }
};

export default Results;
