import { Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale } from "tonal";
import Soundfont from "soundfont-player";

const NoteListeningCard = () => {
  const { state } = useLocation();
  const { id, scale } = state;

  function midiToNote(midiNumber, addOctave) {
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
    const octave = Math.floor(midiNumber / 12) - 1;
    const noteIndex = (midiNumber % 12) + 1;
    if (addOctave) {
      return `${notes[noteIndex - 1]}${octave}`;
    } else {
      return notes[noteIndex - 1];
    }
  }

  function getKeySignature(input) {
    const parts = input.toLowerCase().split(" ");
    const note = parts[0];
    const mode = parts[1];

    const majorSignatures = {
      c: "C",
      g: "G",
      d: "D",
      a: "A",
      e: "E",
      b: "B",
      "f#": "F#",
      "c#": "C#",
    };

    const minorSignatures = {
      a: "C",
      e: "G",
      b: "D",
      "f#": "A",
      "c#": "E",
      "g#": "B",
      "d#": "F#",
      "a#": "C#",
    };

    if (mode === "major" && note in majorSignatures) {
      return majorSignatures[note];
    } else if (mode === "minor" && note in minorSignatures) {
      return minorSignatures[note];
    } else {
      return "C";
    }
  }

  function generateNoteSet(numberOfNotes = 8) {
    // Generate random notes
    let randomNotes = "";
    let randomNotesNoNumber = "";
    for (let i = 0; i < numberOfNotes; i++) {
      // Randomly select a note from the key signature
      const randomNote =
        scaleNotes[Math.floor(Math.random() * scaleNotes.length)];

      // Generate a random octave (assumed from 1 to 5)
      // const randomOctave = Math.random() >= 0.5 ? 4 : 3;
      const randomOctave = 4;

      // Combine note and octave and add to the list

      if (i !== numberOfNotes - 1) {
        randomNotes += randomNote + randomOctave + ",";
        randomNotesNoNumber += randomNote + ",";
      } else {
        randomNotes += randomNote + randomOctave;
        randomNotesNoNumber += randomNote;
      }
    }
    return [randomNotes, randomNotesNoNumber];
  }

  function handleClick() {
  }

  let scaleNotes = Scale.get(midiToNote(id, false) + " " + scale).notes;
  let scaleName =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);
  let generating = generateNoteSet();
  const [notesDisplayed, setNotesDisplayed] = useState(generating[0]);
  const [notesDisplayedNoOctave, setNotesDisplayedNoOctave] = useState(
    generating[1]
  );

  return (
    <Container maxWidth="md">
      <h1>Note Listening</h1>
      <h3>{id + scale}</h3>
      <h3>{notesDisplayed}</h3>

      <Button variant="contained" onClick={handleClick}>
        Click Me!
      </Button>
    </Container>
  );
};

export default NoteListeningCard;
