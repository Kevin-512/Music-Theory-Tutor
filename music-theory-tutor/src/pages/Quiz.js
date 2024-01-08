import React from "react";
import { useLocation } from "react-router-dom";
import QuizCard from "../component/QuizCard";

const Quiz = () => {
  const { state } = useLocation();
  const { id, scale } = state;

  function midiToNote(midiNumber){
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteIndex = (midiNumber % 12) + 1;
    return notes[noteIndex - 1];
  }

  return (
    <div>
      <h1>Quiz</h1>
      <h2>{midiToNote(id)} {scale.charAt(0).toUpperCase() + scale.slice(1)}</h2>
      <QuizCard quizId={id} quizScale={scale.slice(0,3)}/>
    </div>
  );
};

export default Quiz;
