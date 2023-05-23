import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Start from './start';
import Game from './game';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/start" />} />
        <Route path="/start" element={<Start/>} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;