// Ref https://codevertiser.com/quiz-app-using-reactjs/
import {
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import * as allQuizzes from "../constant/quizData";
import StaveBuilder from "../display/StaveBuilder";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import FeedbackCard from "./FeedbackCard";
import Results from "../pages/Results";

const QuizCard = (props) => {
  // Called when the next button is pressed
  const onClickSubmit = (props) => {
    if (selectedAnswerIndex != null) {
      setQuestionSubmitted(true);
      if (activeQuestion === questions.length - 1) {
        setNextButtonText("Results");
      }
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

        console.log("Last Question");
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
  const [nextButtonText, setNextButtonText] = useState("Next");
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { quizId, quizScale } = props;
  const { quizName } = { quizName: quizScale + quizId };

  // This code sets the quiz to be C Major if it doesnt yet exist for the purpose of testing and preventing errors
  let questions;
  if (!(quizName in allQuizzes)) {
    questions = allQuizzes.maj72.questions;
  } else {
    questions = allQuizzes[quizName].questions;
  }

  const { question, choices } = questions[activeQuestion];
  const [viewMCQ, setViewMCQ] = React.useState("list");

  if (!lastQuestion) {
    return (
      <Container maxWidth="md">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginRight: "50px" }}>{props.quizTitle}</h2>
          <div style={{ marginLeft: "50px", marginRight: "80px" }}>
            <Stack direction="row" spacing={7}>
              <Chip
                icon={<DoneOutlineIcon />}
                label={result.correctAnswers}
                variant="outlined"
                color="success"
              />
              <Chip
                icon={<DangerousIcon />}
                label={result.wrongAnswers}
                variant="outlined"
                color="error"
              />
            </Stack>
          </div>
        </div>

        <Container maxWidth="md">
          <h2>{question}</h2>

          {/* Display the stave for the question */}
          <Container
            maxWidth="md"
            style={{ textAlign: "center", paddingBottom: "10px" }}
          >
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
              disabled={questionSubmitted}
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
                    onClickNext();
                    handleChange();
                  }}
                >
                  {nextButtonText}
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Container style={{ paddingTop: "20px" , justifyContent: "center", display: "flex"}}>
              <FeedbackCard
                display={questionSubmitted}
                result={selectedAnswer}
                feedback={questions[activeQuestion].correctAnswer}
              />

          </Container>
        </Container>
      </Container>
    );
  } else {
    return (
      <Container>
        <Results
          authenticated={props.authenticated}
          userID={props.userID}
          correct={result.correctAnswers}
          wrong={result.wrongAnswers}
          origin={"Quizzes"}
          keySig={props.keySig}
        />
      </Container>
    );
  }
};

export default QuizCard;
