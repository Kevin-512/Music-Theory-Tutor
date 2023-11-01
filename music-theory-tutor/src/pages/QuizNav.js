import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Soundfont from "soundfont-player";

const QuizNav = () => {
  const navigate = useNavigate();

  const firstNote = MidiNumbers.fromNote("c5");
  const lastNote = MidiNumbers.fromNote("c6");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div>
      <div>
        <h1>Quiz</h1>
      </div>
      <div>
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            var ac = new AudioContext();
            Soundfont.instrument(ac, "acoustic_grand_piano").then((piano) => {
              piano.play(midiNumber, ac.currentTime, { duration: 0.7 });
            });
          }}
          stopNote={(midiNumber) => {
            // Navigation to quizzes by passing the key number/midiNumber
            navigate("/quiz", { state: { id: midiNumber } });
          }}
          width={1000}
          // Can use this property to change the width of the key: keyWidthToHeight={0.5}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
};

export default QuizNav;
