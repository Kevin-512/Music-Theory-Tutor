import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Sidebar from "./component/Sidebar";
import { Container, ThemeProvider, Toolbar, createTheme } from "@mui/material";
import Learn from "./pages/Learn";
import NoteRecognition from "./pages/NoteRecognition";
import QuizNav from "./pages/QuizNav";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";
import NoteRecognitionPane from "./pages/NoteRecognitionPane";
import { useState } from "react";
import RegisterCard from "./component/RegisterCard";
import History from "./pages/History";
import NoteListening from "./pages/NoteListening";
import NoteListeningCard from "./component/NoteListeningCard";
import NoteRecognitionSplit from "./pages/NoteRecognitionSplit";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userID, setUserID] = useState(0);
  const [userName, setUserName] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");
  const [color, setColor] = useState("#883bc4");
  const [fontSize, setFontSize] = useState(14);
  const [webTheme, setWebTheme] = useState("light");
  const theme = createTheme({
    palette: {
      primary: {
        main: color,
      },
      mode: webTheme
    },
    typography: {
      fontSize: fontSize,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Sidebar />
          <Navbar />
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/sightreading" element={<NoteRecognition />} />
            <Route path="/quizmap" element={<QuizNav />} />
            <Route
              path="/profile"
              element={
                <Profile
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  setUserID={setUserID}
                  setUserName={setUserName}
                  userName={userName}
                  setLoggedEmail={setLoggedEmail}
                  loggedEmail={loggedEmail}
                  setColor={setColor}
                  setFontSize={setFontSize}
                  userID={userID}
                  setWebTheme={setWebTheme}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  setUserID={setUserID}
                  setColor={setColor}
                  loggedEmail={loggedEmail}
                  userID={userID}
                  color={color}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  setWebTheme={setWebTheme}
                  webTheme={webTheme}
                />
              }
            />
            <Route path="/quiz" element={<Quiz userID={userID} />} />
            <Route
              path="/sightreadingquiz"
              element={
                <NoteRecognitionPane
                  authenticated={authenticated}
                  userID={userID}
                />
              }
            />
            <Route path="/register" element={<RegisterCard />} />
            <Route
              path="/history"
              element={
                <History
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  setUserID={setUserID}
                  userID={userID}
                />
              }
            />
            <Route path="/notelistening" element={<NoteListening />} />
            <Route
              path="/notelisteningquiz"
              element={
                <NoteListeningCard
                  authenticated={authenticated}
                  userID={userID}
                />
              }
            />
            <Route path="/recognitionselect" element={<NoteRecognitionSplit />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
