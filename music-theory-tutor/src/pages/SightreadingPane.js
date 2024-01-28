import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale } from "tonal";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Soundfont from "soundfont-player";
import { Vex } from "vexflow";

const SightreadingPane = () => {
  const firstNote = MidiNumbers.fromNote("c5");
  const lastNote = MidiNumbers.fromNote("b5");
  const { state } = useLocation();
  const { id, scale } = state;
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

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: [
      {
        natural: "C",
        flat: "Cb",
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
        flat: "Fb",
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
      const randomOctave = Math.random() >= 0.5 ? 4 : 3;

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

  function checkNote() {
    const firstComma = notesDisplayedNoOctave.indexOf(',');
    const nextNote = firstComma !== -1 ? notesDisplayedNoOctave.slice(0, firstComma) : notesDisplayedNoOctave;
    const splicedString = firstComma !== -1 ? notesDisplayed.slice(firstComma + 2) : '';
    console.log(notesDisplayed)
    console.log(splicedString)
    if (nextNote === notePressed) {
      setResult(prevResult => ({
          ...prevResult,
          score: prevResult.score + 1,
          correctAnswers: prevResult.correctAnswers + 1,
      }));
      setNotesDisplayed(splicedString);
    console.log(notesDisplayed);

  } else {
      setResult(prevResult => ({
          ...prevResult,
          wrongAnswers: prevResult.wrongAnswers + 1,
      }));
  }
  }

  let scaleNotes = Scale.get(midiToNote(id, false) + " " + scale).notes;
  let scaleName =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);
  let generating = generateNoteSet();

  // Holds the notes that are shown in the stave
  const [notesDisplayed, setNotesDisplayed] = useState(generating[0]);
  const [notesDisplayedNoOctave, setNotesDisplayedNoOctave] = useState(generating[1]);
  const [notePressed, setNotePressed] = useState("");
  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);

  const handleButtonClick = (midiNumber) => {
    setNotePressed(midiToNote(midiNumber, false));
    checkNote();
    
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

  return (
    <div>
      <h1>SightReading</h1>
      <h2>{scaleName}</h2>
      <h3>{scale.slice(0, 3) + id}</h3>
      <h3>{"Right: " + result.correctAnswers}</h3>
      <h3>{"Wrong: " + result.wrongAnswers}</h3>
      <h3>{"NotePressed: " + notePressed}</h3>
      <h3>{"NoteNoOctave: " + notesDisplayedNoOctave}</h3>
      <h3>{"NoteDisplayed: " + notesDisplayed}</h3>
      <svg ref={outputRef}></svg>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          var ac = new AudioContext();
          Soundfont.instrument(ac, "acoustic_grand_piano").then((piano) => {
            piano.play(midiNumber, ac.currentTime, { duration: 0.7 });
          });
        }}
        stopNote={(midiNumber) => {
          handleButtonClick(midiNumber);
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  );
};

export default SightreadingPane;
