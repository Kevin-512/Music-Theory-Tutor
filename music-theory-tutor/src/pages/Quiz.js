import React from "react";
import { useLocation } from "react-router-dom";
import QuizCard from "../component/QuizCard";

const Quiz = () => {
  const { state } = useLocation();
  const { id, scale } = state;

  return (
    <div>
      <h1>Quiz</h1>
      <h2>{id} {scale}</h2>
      <QuizCard />
    </div>
  );
};

export default Quiz;
