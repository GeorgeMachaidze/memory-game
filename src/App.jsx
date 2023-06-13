import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Start from "./Home";
import Game from "./Game";
import GameIcons from "./Icons";
import MultiplayerPageNumbers from "./MultiplayerPageNumbers";
import MultiplayerPageIcons from "./MultiplayerPageIcons";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/GameIcons" element={<GameIcons />} />
        <Route
          path="/MultiplayerPageNumbers"
          element={<MultiplayerPageNumbers />}
        />
        <Route
          path="/MultiplayerPageIcons"
          element={<MultiplayerPageIcons />}
        />
      </Routes>
    </Router>
  );
}

export default App;
