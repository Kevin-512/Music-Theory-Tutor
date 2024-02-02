import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale } from "tonal";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Soundfont from "soundfont-player";
import { Vex } from "vexflow";
import Fab from "@mui/material/Fab";
import { Button, Stack, Toolbar } from "@mui/material";
import Chip from "@mui/material/Chip";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Results from "./Results";

const NoteRecognitionPane = () => {
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

    return note_dict[note]
  }

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
  function displayResults() {
    setContinueClicked(true);
  }

  const [seconds, setSeconds] = useState(limit);
  const [isActive, setIsActive] = useState(true);
  const [continueClicked, setContinueClicked] = useState(false);

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
  }, [notesDisplayed]);

  if (!continueClicked) {
    return (
      <div>
        <h1>SightReading</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginRight: "150px" }}>{scaleName}</h2>
          <Fab color="secondary" variant="extended">
            {seconds}
          </Fab>
          <div style={{ marginLeft: "80px", marginRight: "80px" }}>
            <Stack direction="row" spacing={7}>
              <Chip
                icon={<DoneOutlineIcon />}
                label={result.correctAnswers}
                variant="outlined"
                color="success"
              />
              <Chip
                icon={<DangerousIcon />}
                label={result.wrongAnswers}
                variant="outlined"
                color="error"
              />
            </Stack>
          </div>
          <Button
            variant="contained"
            disabled={isActive}
            onClick={displayResults}
          >
            Results
          </Button>
        </div>

        <div style={{ marginLeft: "100px" }}>
          <svg ref={outputRef}></svg>
        </div>
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            var ac = new AudioContext();
            Soundfont.instrument(ac, "acoustic_grand_piano").then((piano) => {
              piano.play(midiNumber, ac.currentTime, { duration: 0.7 });
            });
            handleButtonClick(midiNumber);
          }}
          stopNote={(midiNumber) => {
            
          }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    );
  } else {
    return (
      <Results
        correct={result.correctAnswers}
        wrong={result.wrongAnswers}
        origin={"SightReading"}
      />
    );
  }
};

export default NoteRecognitionPane;
