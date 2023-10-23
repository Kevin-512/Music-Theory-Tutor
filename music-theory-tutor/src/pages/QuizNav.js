import React, { useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Soundfont from "soundfont-player";

const QuizNav = () => {
  const navigate = useNavigate();

  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("c5");
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
            //BLOCK OF CODE MAY REQUIRE ALTERING
            Soundfont.instrument(
              new AudioContext(),
              "acoustic_grand_piano"
            ).then((piano) => {
              piano.play(midiNumber);
            });
            ////////////////////////////////////
          }}
          stopNote={(midiNumber) => {
            // FIGURE OUT HOW TO LIMIT THE TIME WHICH THE NOTE PLAYS FOR EVEN AFTER NAVIGATION

            if (midiNumber === 60) {
              navigate("/");
            }
          }}
          width={1000}
          // Can use this property to change the width of the key keyWidthToHeight={0.5}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
};

export default QuizNav;
