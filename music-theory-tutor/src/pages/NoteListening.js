import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material";
import React from "react";
import TitleGrid from "../component/TitleGrid";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { useNavigate } from "react-router-dom";
import Soundfont from "soundfont-player";

// Create a navigation to select the note for note listening

const NoteListening = () => {
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
      <TitleGrid
        title={"Note Listening"}
        description={"Audio training for better note recognition"}
        image={
          "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#dfc920"}
      />

      {/* Displays piano with notes labelled telling the user which note will be quizzed on */}
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
          navigate("/notelisteningquiz", {
            state: { id: midiNumber, scale: alignment },
          });
        }}
        width={1000}
        // Can use this property to change the width of the key: keyWidthToHeight={0.5}
        keyboardShortcuts={keyboardShortcuts}
      />
      <Toolbar />

      {/* Button for choosing between Major or Minor quiz */}
      <ToggleButtonGroup
        style={{ marginRight: "30px" }}
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="major">Major</ToggleButton>
        <ToggleButton value="minor">Natural Minor</ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

export default NoteListening;
