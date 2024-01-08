// Ref https://codevertiser.com/quiz-app-using-reactjs/
import {
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import * as allQuizzes from "../constant/quizData";
import StaveBuilder from "../display/StaveBuilder";
import { useNavigate } from "react-router-dom";

const QuizCard = (props) => {
  // Called when the next button is pressed

  const onClickSubmit = (props) => {
    if (selectedAnswerIndex != null) {
      setQuestionSubmitted(true);
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 1,
              correctAnswers: prev.correctAnswers + 1,
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      );
    }
  };

  const onClickNext = () => {
    // Checks that an answer has been selected, if it hasn't then nothing happens. Otherwise moves to next question
    // Code below has been reused from reference
    console.log("Adding Score Works");

    if (selectedAnswerIndex != null) {
      setQuestionSubmitted(false);
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
        setSelectedAnswerIndex(null);
      } else {
        setActiveQuestion(0);
        setLastQuestion(true);
        // setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });

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
    setViewMCQ(nextView);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { quizId, quizScale } = props;
  const { questions } = allQuizzes[quizScale + quizId];

  const { question, choices } = questions[activeQuestion];
  const [viewMCQ, setViewMCQ] = React.useState("list");
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ marginLeft: "100px" }}>
          {"Score: " +
            (result.correctAnswers + result.wrongAnswers === 0
              ? "N/A"
              : (
                  Number(
                    result.correctAnswers /
                      (result.correctAnswers + result.wrongAnswers)
                  ).toFixed(4) * 100
                ).toFixed(2) + "%")}
        </span>
        <span>{"Correct: " + result.correctAnswers}</span>
        <span style={{ marginRight: "100px" }}>
          {"Wrong: " + result.wrongAnswers}
        </span>
      </h2>

      <Container maxWidth="lg">
        <h2>{question}</h2>

        {/* Display the stave for the question */}
        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          {/* <img src={quaver} alt="Quaver" width="250"/> */}
          <StaveBuilder
            clef={questions[activeQuestion].clef}
            timeSig={questions[activeQuestion].timeSig}
            notes={questions[activeQuestion].notes}
            keySig={questions[activeQuestion].keySig}
          />

          {/* Display the list of possible answers to the question */}
          <ToggleButtonGroup
            fullWidth
            orientation="vertical"
            value={viewMCQ}
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
        </Container>
        {/* Toolbar creates whitespace */}
        <Toolbar />

        {/* Code for question navigation button */}
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            container
            spacing={20}
            justify="space-between"
          >
            {/* Submit Button */}
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Submitting");
                  onClickSubmit();
                }}
                disabled={
                  selectedAnswer === "" ||
                  selectedAnswerIndex === null ||
                  questionSubmitted === true
                }
              >
                Submit
              </Button>
            </Grid>
            {/* Next Button */}
            <Grid item>
              <Button
                disabled={questionSubmitted === false}
                variant="contained"
                onClick={() => {
                  if (lastQuestion === true) {
                    navigate("/quizmap");
                  } else {
                    onClickNext();
                    handleChange();
                  }
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
};

export default QuizCard;
