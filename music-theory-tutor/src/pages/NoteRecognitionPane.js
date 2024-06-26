import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale } from "tonal";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Soundfont from "soundfont-player";
import { Vex } from "vexflow";
import Fab from "@mui/material/Fab";
import { Button, Container, Stack, Toolbar } from "@mui/material";
import Chip from "@mui/material/Chip";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Results from "./Results";

const NoteRecognitionPane = (props) => {
  const firstNote = MidiNumbers.fromNote("a4");
  const lastNote = MidiNumbers.fromNote("c6");
  const { state } = useLocation();
  const { id, scale, limit } = state;
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

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

  // Converts a midinumber to a single note, adds sharp/flat if needed
  function noteToMidi(note) {
    let note_dict = {
      C: 0,
      "C#": 1,
      Db: 1,
      D: 2,
      "D#": 3,
      Eb: 3,
      E: 4,
      F: 5,
      "F#": 6,
      Gb: 6,
      G: 7,
      "G#": 8,
      Ab: 8,
      A: 9,
      "A#": 10,
      Bb: 10,
      B: 11,
    };

    return note_dict[note];
  }

  // Labels for individual keys on the visual keyboard
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: [
      {
        natural: "A",
        flat: "A#",
      },
      {
        natural: "B",
        flat: "A#",
      },
      {
        natural: "C",
        flat: "B#",
      },
      {
        natural: "D",
        flat: "C#",
      },
      {
        natural: "E",
        flat: "D#",
      },
      {
        natural: "F",
        flat: "E#",
      },
      {
        natural: "G",
        flat: "F#",
      },
      {
        natural: "A",
        flat: "G#",
      },
      {
        natural: "B",
        flat: "A#",
      },
      {
        natural: "C",
        flat: "B#",
      },
    ],
  });

  // Gets the keySignature of a note entered as a parameter
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

  // Generates the random notes to be displayed upon loading a quiz
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

  // If a note is pressed, compares it with the first note being displayed and removes it if it matches, otherwise does nothing
  function checkNote(notePressed) {
    const firstComma = notesDisplayedNoOctave.indexOf(",");
    const nextNote =
      firstComma !== -1
        ? notesDisplayedNoOctave.slice(0, firstComma)
        : notesDisplayedNoOctave;
    const splicedString =
      firstComma !== -1 ? notesDisplayed.slice(firstComma + 2) : "";
    const splicedStringNoOctave =
      firstComma !== -1 ? notesDisplayedNoOctave.slice(firstComma + 1) : "";
    let nextNoteGenerate = generateNoteSet(1);
    const nextNoteOctave = nextNoteGenerate[0];
    const nextNoteNoOctave = nextNoteGenerate[1];
    if (noteToMidi(nextNote) === noteToMidi(notePressed) && isActive) {
      setResult((prevResult) => ({
        ...prevResult,
        score: prevResult.score + 1,
        correctAnswers: prevResult.correctAnswers + 1,
      }));
      setNotesDisplayed(splicedString + "," + nextNoteOctave);
      setNotesDisplayedNoOctave(splicedStringNoOctave + "," + nextNoteNoOctave);
    } else if (isActive) {
      setResult((prevResult) => ({
        ...prevResult,
        wrongAnswers: prevResult.wrongAnswers + 1,
      }));
    }
  }

  // Shows the results when the user has finished the quiz
  function displayResults() {
    setContinueClicked(true);
  }

  const [seconds, setSeconds] = useState(limit);
  const [isActive, setIsActive] = useState(true);
  const [continueClicked, setContinueClicked] = useState(false);

  // Removes anymore inputs when the timer has run out for the current quiz instance
  useEffect(() => {
    let interval = null;

    if (isActive && seconds === 0) {
      setIsActive(false);
    } else if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  let scaleNotes = Scale.get(midiToNote(id, false) + " " + scale).notes;
  let scaleName =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);
  let generating = generateNoteSet();

  // Holds the notes that are shown in the stave
  const [notesDisplayed, setNotesDisplayed] = useState(generating[0]);
  const [notesDisplayedNoOctave, setNotesDisplayedNoOctave] = useState(
    generating[1]
  );
  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);

  const handleButtonClick = (midiNumber) => {
    checkNote(midiToNote(midiNumber, false));
  };

  // Displays the stave on the page with the clef, keySig and timeSig
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.innerHTML = "";

      const vf = new Factory({
        renderer: { elementId: outputRef.current, width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [score.voice(score.notes(notesDisplayed)).setStrict(false)],
        })
        .addClef("treble")
        .addTimeSignature("4/4")
        .addKeySignature(getKeySignature(scaleName));
      vf.draw();
    }
  }, [notesDisplayed, Factory, scaleName]);

  // Displays the following before submit is clicked
  if (!continueClicked) {
    return (
      <Container maxWidth="md">
        <Toolbar />

        {/* Section containing the buttons for submitting, showing the user's correct and wrong answers  */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginRight: "150px" }}>{scaleName}</h2>
          {/* Shows time remaining */}
          <Fab color="secondary" variant="extended">
            {seconds}
          </Fab>
          <div style={{ marginLeft: "80px", marginRight: "80px" }}>
            <Stack direction="row" spacing={7}>
              {/* Shows what the user got right so far */}
              <Chip
                icon={<DoneOutlineIcon />}
                label={result.correctAnswers}
                variant="outlined"
                color="success"
              />
              {/* Shows how many wrong answers */}
              <Chip
                icon={<DangerousIcon />}
                label={result.wrongAnswers}
                variant="outlined"
                color="error"
              />
            </Stack>
          </div>
          {/* Button for moving to results page */}
          <Button
            variant="contained"
            disabled={isActive}
            onClick={displayResults}
          >
            Results
          </Button>
        </div>

        {/* Display of the stave */}
        <div style={{ marginLeft: "100px" }}>
          <svg ref={outputRef}></svg>
        </div>
        {/* Displaying the piano */}
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            var ac = new AudioContext();
            Soundfont.instrument(ac, "acoustic_grand_piano").then((piano) => {
              var note = piano.play(midiNumber, ac.currentTime, {
                duration: 0.7,
              });
              var gainNode = ac.createGain();
              gainNode.gain.value = 10;
              note.connect(gainNode);
              gainNode.connect(ac.destination);
            });
            handleButtonClick(midiNumber);
          }}
          stopNote={(midiNumber) => {}}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
        <Toolbar />
      </Container>
    );
  } else {
    // Displayed when the submit button is pressed and shows the user's results
    return (
      <Container maxWidth="md">
        <Results
          authenticated={props.authenticated}
          userID={props.userID}
          correct={result.correctAnswers}
          wrong={result.wrongAnswers}
          origin={"SightReading"}
          keySig={midiToNote(id)}
          time={limit}
        />
      </Container>
    );
  }
};

export default NoteRecognitionPane;
