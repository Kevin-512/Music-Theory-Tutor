// Ref https://codevertiser.com/quiz-app-using-reactjs/
import {
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

const QuizCard = () => {
  const quiz = {
    topic: "Javascript",
    level: "Beginner",
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [
      {
        question:
          "Which function is used to serialize an object into a JSON string in Javascript?",
        choices: ["stringify()", "parse()", "convert()", "None of the above"],
        type: "MCQs",
        correctAnswer: "stringify()",
      },
      {
        question:
          "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "var and let", "None of the above"],
        type: "MCQs",
        correctAnswer: "var and let",
      },
      {
        question: "How can a datatype be declared to be a constant type?",
        choices: ["const", "var", "let", "constant"],
        type: "MCQs",
        correctAnswer: "const",
      },
    ],
  };

  // Called when the next button is pressed
  const onClickNext = () => {
    // Checks that an answer has been selected, if it hasn't then nothing happens. Otherwise moves to next question
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
    <Container maxWidth="md">
      <h2>{question}</h2>
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
