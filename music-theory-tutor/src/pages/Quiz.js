import React from "react";
import { useLocation } from "react-router-dom";
import QuizCard from "../component/QuizCard";
import { Container, Toolbar } from "@mui/material";

const Quiz = (props) => {
  const { state } = useLocation();
  const { id, scale} = state;
  let quizTitle =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);

  function midiToNote(midiNumber) {
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const noteIndex = (midiNumber % 12) + 1;
    return notes[noteIndex - 1];
  }

  return (
    <Container maxWidth="md">
      <Toolbar />
      <QuizCard
        quizId={id}
        quizScale={scale.slice(0, 3)}
        quizTitle={quizTitle}
        userID={props.userID}
        keySig={midiToNote(id)}
      />
    </Container>
  );
};

export default Quiz;
