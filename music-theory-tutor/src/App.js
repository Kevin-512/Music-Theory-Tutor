import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Sidebar from "./component/Sidebar";
import { Toolbar } from "@mui/material";
import Learn from "./pages/Learn";
import Sightreading from "./pages/Sightreading";
import QuizNav from "./pages/QuizNav";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";
import SightreadingPane from "./pages/SightreadingPane";

function App() {
  return (
    <Router>
      <Sidebar />
      <Navbar />
      <Toolbar />
      <div style={{ paddingLeft: 300 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/sightreading" element={<Sightreading />} />
          <Route path="/quizmap" element={<QuizNav />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/sightreadingquiz" element={<SightreadingPane />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;