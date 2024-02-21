import { Button, Container } from "@mui/material";
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
  function onClick() {
    if (props.origin === "SightReading") {
      navigate("/sightreading");
      if (props.userID !== 0) {
        data.quizType = "Sightreading";
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
      if(props.userID !== 0){
      data.quizType = "Notelistening";
      handleButtonClick()
      }
    } else {
      navigate("/");
    }
  }

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
          <ResponsiveContainer width="20%" height={250}>
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
        <h3>{"Correct: " + props.correct}</h3>
        <h3>{"Mistakes: " + props.wrong}</h3>
        <h3>{"Accuracy: " + (accuracy * 100).toFixed(3) + "%"}</h3>
        <h3>{"Total Answered: " + total}</h3>
        <h3>{props.userID}</h3>
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
        <h1>{props.correctNoOctave}</h1>
        <h1>{answerNoOctave}</h1>
        <h1>
          {"Accuracy: " + (answeredCorrectly / correctArray.length) * 100 + "%"}
        </h1>
        <Button onClick={onClick} variant="contained">
          Return
        </Button>
      </Container>
    );
  }
};

export default Results;
