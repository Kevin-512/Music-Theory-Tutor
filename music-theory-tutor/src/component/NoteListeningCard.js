import { Button, ButtonGroup, Container, Grid, Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale, note } from "tonal";
import Soundfont from "soundfont-player";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { Vex } from "vexflow";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import Results from "../pages/Results";

const NoteListeningCard = (props) => {
  const { state } = useLocation();
  const { id, scale } = state;
  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("b4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: [
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

  function generateNoteSet(numberOfNotes = 5) {
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

  let scaleNotes = Scale.get(midiToNote(id, false) + " " + scale).notes;
  let scaleName =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);
  let generating = generateNoteSet();
  const [notesDisplayed, setNotesDisplayed] = useState(generating[0]);
  const [notesDisplayedNoOctave, setNotesDisplayedNoOctave] = useState(
    generating[1]
  );
  const [noteSequence, setNoteSequence] = useState("");
  const [result, setResult] = useState(Boolean);
  const [submitClicked, setSubmitClicked] = useState(false);

  function playSequence() {
    console.log(notesDisplayed);
    var ac = new AudioContext();
    Soundfont.instrument(ac, "acoustic_grand_piano").then((piano) => {
      let notesToPlay = notesDisplayed.split(",");

      notesToPlay.forEach((noteName, index) => {
        var note = piano.play(noteName, ac.currentTime + index * 0.7, {
          duration: 0.7,
        });
        var gainNode = ac.createGain();
        gainNode.gain.value = 10;
        note.connect(gainNode);
        gainNode.connect(ac.destination);
      });
    });
  }

  function handlePianoPlay(midiNumber) {
    if (noteSequence.split(",").length >= notesDisplayed.split(",").length) {
      return;
    }

    if (noteSequence === "") {
      setNoteSequence(noteSequence + midiToNote(midiNumber, true));
    } else {
      setNoteSequence(noteSequence + "," + midiToNote(midiNumber, true));
    }
    console.log(noteSequence);
  }

  function checkResult() {
    if (noteSequence === notesDisplayed) {
      setResult(true);
    } else {
      setResult(false);
    }
    setSubmitClicked(true);
  }

  function clearResult() {
    setNoteSequence("");
  }

  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);
  useEffect(() => {
    if (outputRef.current && noteSequence) {
      outputRef.current.innerHTML = "";

      const vf = new Factory({
        renderer: { elementId: outputRef.current, width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [score.voice(score.notes(noteSequence)).setStrict(false)],
        })
        .addClef("treble")
        .addTimeSignature("4/4")
        .addKeySignature(getKeySignature(scaleName));

      vf.draw();
    }
  }, [noteSequence]);

  if (!submitClicked) {
    return (
      <Container maxWidth="md">
        <Toolbar />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ marginRight: "50px", whiteSpace: "nowrap" }}>
            {scaleName}
          </h2>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                onClick={playSequence}
                startIcon={<PlayCircleFilledTwoToneIcon />}
              >
                Play Sequence
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                onClick={clearResult}
                startIcon={<DeleteTwoToneIcon />}
              >
                Clear
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                onClick={checkResult}
                startIcon={<TaskAltTwoToneIcon />}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
        <Container>
          {noteSequence ? (
            <svg ref={outputRef}></svg>
          ) : (
            <div style={{ width: 500, height: 157 }}></div>
          )}
        </Container>
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
            handlePianoPlay(midiNumber);
          }}
          stopNote={() => {}}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
      </Container>
    );
  } else {
    return (
      <Results
        authenticated={props.authenticated}
        userID={props.userID}
        correct={notesDisplayed}
        correctNoOctave={notesDisplayedNoOctave}
        answer={noteSequence}
        origin={"NoteListening"}
        keySig={midiToNote(id)}
      />
    );
  }
};

export default NoteListeningCard;
