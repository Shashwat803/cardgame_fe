import './App.css';
import GameBoard from './pages/GameBoard';
import Leaderboard from './pages/Leaderboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<GameBoard/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
    </Routes>
    </Router>

  );
}

export default App;
