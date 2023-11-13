// Ref https://codevertiser.com/quiz-app-using-reactjs/
import {
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import quaver from "../images/treble_clef_notes/treble_A2.png";
import { quiz } from "../constant/quizData";
import StaveBuilder from "../display/StaveBuilder";

const QuizCard = () => {
  // Called when the next button is pressed
  const onClickNext = () => {
    // Checks that an answer has been selected, if it hasn't then nothing happens. Otherwise moves to next question
    // Code below has been reused from reference
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (selectedAnswerIndex != null) {
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
        setSelectedAnswerIndex(null);
      } else {
        setActiveQuestion(0);
        setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
        console.log("Finished");
      }
    }
  };

  // Stores whether the selected answer is the correct one or not
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    console.log(index);
    if (answer === questions[activeQuestion].correctAnswer) {
      setSelectedAnswer(true);
      console.log("right");
    } else {
      setSelectedAnswer(false);
      console.log("wrong");
    }
  };

  // Refreshes the appearance of the multiple choice question
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { questions } = quiz;
  const { question, choices } = questions[activeQuestion];
  const [view, setView] = React.useState("list");

  return (
    <Container maxWidth="lg">
      <h2>{question}</h2>
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        {/* <img src={quaver} alt="Quaver" width="250"/> */}
        <StaveBuilder
          clef={questions[activeQuestion].clef}
          timeSig={questions[activeQuestion].timeSig}
          notes={questions[activeQuestion].notes}
        />
      </Container>
      <ToggleButtonGroup
        fullWidth
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        {choices.map((answer, index) => (
          <ToggleButton
            value={index}
            key={answer}
            onClick={() => onAnswerSelected(answer, index)}
            // className={selectedAnswerIndex === index ? "selected-answer" : null}
          >
            {answer}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Toolbar />
      {/* Code for question navigation button */}
      <Container style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ textAlign: "right" }}
          variant="contained"
          onClick={() => {
            onClickNext();
            handleChange();
          }}
        >
          Next
        </Button>
      </Container>

      <h3>{"Score:" + result.score}</h3>
      <h3>{"Correct:" + result.correctAnswers}</h3>
      <h3>{"Wrong:" + result.wrongAnswers}</h3>
    </Container>
  );
};

export default QuizCard;
