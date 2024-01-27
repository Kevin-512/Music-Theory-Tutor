import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Scale } from "tonal";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Soundfont from "soundfont-player";
import { Vex } from "vexflow";

const SightreadingPane = () => {
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
  let scaleNotes = Scale.get(midiToNote(id, false) + " " + scale).notes;
  let scaleName =
    midiToNote(id) + " " + scale.charAt(0).toUpperCase() + scale.slice(1);
  

  const firstNote = MidiNumbers.fromNote("c5");
  const lastNote = MidiNumbers.fromNote("b5");

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

    if (mode === "major") {
      return majorSignatures[note];
    } else if (mode === "minor") {
      return minorSignatures[note];
    } else {
      return null;
    }
  }

  function generateNoteSet(numberOfNotes) {
    // Generate random notes
    const randomNotes = [];
    const randomNotesNoNumber = [];
    for (let i = 0; i < numberOfNotes; i++) {
      // Randomly select a note from the key signature
      const randomNote = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];

      // Generate a random octave (assumed from 1 to 5)
      const randomOctave = Math.floor(Math.random() * 5) + 1;

      // Combine note and octave and add to the list
      
      if (i !== numberOfNotes-1){
        randomNotes.push(randomNote + randomOctave + ",");
        randomNotesNoNumber.push(randomNote + ",");
      }else{
        randomNotes.push(randomNote + randomOctave);
        randomNotesNoNumber.push(randomNote);
      }
    }

    return [randomNotes, randomNotesNoNumber];
  }

  let [generatedNotes, generatedNotesNoNumber] = generateNoteSet(8)
  const [notesDisplayed, setNotesDisplayed] = useState("A2");
  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);

  const handleButtonClick = (midiNumber) => {
    setNotesDisplayed(
      (prevNotesDisplayed) =>
        prevNotesDisplayed + "," + midiToNote(midiNumber, true)
    );
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
      <h3>{getKeySignature(scaleName)}</h3>
      <h3>{scaleNotes}</h3>
      <h3>{generatedNotesNoNumber}</h3>
      <h3>{notesDisplayed}</h3>
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
