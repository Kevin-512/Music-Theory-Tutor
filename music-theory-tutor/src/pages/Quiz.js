import React from "react";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const { state } = useLocation();
  const { id } = state;

  return (
    <div>
      <h1>Quiz</h1>
      <h2>{id}</h2>
    </div>
  );
};

export default Quiz;