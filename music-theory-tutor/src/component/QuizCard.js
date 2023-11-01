// Ref https://codevertiser.com/quiz-app-using-reactjs/
import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
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

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const onClickNext = () => {
    setActiveQuestion((prev) => prev + 1);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === questions[activeQuestion].correctAnswer) {
      setSelectedAnswer(true);
      console.log("right");
    } else {
      setSelectedAnswer(false);
      console.log("wrong");
    }
  };

  const { questions } = quiz;
  const { question, choices } = questions[activeQuestion];
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <Container>
      <h1>QuizCard</h1>
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
            // onClick={() => onAnswerSelected(answer, index)}
            // className={selectedAnswerIndex === index ? "selected-answer" : null}
          >
            {answer}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <button onClick={onClickNext}>Next</button>
    </Container>
  );
};

export default QuizCard;
