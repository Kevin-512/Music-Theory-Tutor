import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Soundfont from "soundfont-player";
import {
  ToggleButtonGroup,
  ToggleButton,
  Toolbar,
  Container,
} from "@mui/material";
import TitleGrid from "../component/TitleGrid";

// Displays a piano which can be used to navigate between different quizzes depending on the note chosen by the user

const QuizNav = () => {
  const [alignment, setAlignment] = React.useState("major");
  const navigate = useNavigate();

  const firstNote = MidiNumbers.fromNote("c5");
  const lastNote = MidiNumbers.fromNote("c6");
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
      {
        natural: "All Scales",
        flat: "All Scales",
      },
    ],
  });

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Container maxWidth="md">
      {/* Display Banner */}
      <TitleGrid
        title={"Quizzes"}
        description={"Choose a note to begin a quiz with the note selected"}
        image={
          "https://images.pexels.com/photos/5428829/pexels-photo-5428829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#36c3c9"}
      />

      {/* Display Piano for user to navigate */}
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber, volume = 1.0) => {
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
        }}
        stopNote={(midiNumber) => {
          // Navigation to quizzes by passing the key number/midiNumber
          navigate("/quiz", { state: { id: midiNumber, scale: alignment } });
        }}
        width={1000}
        // Can use this property to change the width of the key: keyWidthToHeight={0.5}
        keyboardShortcuts={keyboardShortcuts}
      />

      <Toolbar />

      {/* Buttons for the user to choose if the quiz is given in the major or minor chord */}
      <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
        <ToggleButton value="major">Major</ToggleButton>
        <ToggleButton value="minor">Natural Minor</ToggleButton>
      </ToggleButtonGroup>
      <Toolbar />
    </Container>
  );
};

export default QuizNav;
