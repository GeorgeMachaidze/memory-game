import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Start from "./start";
import Game from "./game";
import GameIcons from "./gameIcons";
import MultiplayerPageNumbers from "./MultiplayerPageNumbers";
import MultiplayerPageIcons from "./MultiplayerPageIcons";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/start" element={<Start />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameIcons" element={<GameIcons />} />
        <Route
          path="/multiplayerPageNumbers"
          element={<MultiplayerPageNumbers />}
        />
        <Route
          path="/multiplayerPageIcons"
          element={<MultiplayerPageIcons />}
        />
      </Routes>
    </Router>
  );
}

export default App;
