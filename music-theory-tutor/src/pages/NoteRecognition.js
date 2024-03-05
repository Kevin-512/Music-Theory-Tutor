import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Soundfont from "soundfont-player";
import { useNavigate } from "react-router-dom";
import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import TitleGrid from "../component/TitleGrid";

// Navigation for note recognition

const NoteRecognition = () => {
  const [alignment, setAlignment] = React.useState("major");
  const [time, setTime] = React.useState(30);
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

  const changeTime = (event) => {
    setTime(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <TitleGrid
        title={"Note Reading"}
        description={"Choose a note to begin the exercise"}
        image={
          "https://images.pexels.com/photos/14990223/pexels-photo-14990223/free-photo-of-close-up-photo-of-a-music-sheet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        imageText={"main image description"}
        color={"#ca0900"}
      />

      {/* Piano for selecting the scale to be quizzed on */}
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
          navigate("/sightreadingquiz", {
            state: { id: midiNumber, scale: alignment, limit: time },
          });
        }}
        width={1000}
        // Can use this property to change the width of the key: keyWidthToHeight={0.5}
        keyboardShortcuts={keyboardShortcuts}
      />

      <div
        style={{
          paddingTop: "50px",
          justifyContent: "left",
          display: "flex",
          paddingBottom: "50px",
        }}
      >
        {/* Buttons for changing between the major or natural minor */}
        <ToggleButtonGroup
          style={{ marginRight: "30px" }}
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="major">Major</ToggleButton>
          <ToggleButton value="minor">Natural Minor</ToggleButton>
        </ToggleButtonGroup>

        {/* Form for choosing the amount of time the quiz lasts for */}
        <FormControl>
          <InputLabel>Time</InputLabel>
          <Select value={time} label="Time" onChange={changeTime}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Container>
  );
};

export default NoteRecognition;
