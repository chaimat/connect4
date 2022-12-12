import './App.css';
import PlayerCard from './components/playerCard/PlayerCard.jsx';
import Board from './components/board/board.jsx';
import { useState, useEffect } from 'react';

function App() {

  // changing winner names on H1
  // changing start button to restart on game start, (clear board as well)
  // store number of wins
  
  const [player1, setPlayer1] = useState("Chaitanya")
  const [player2, setPlayer2] = useState("Adithya")
  const [hasWon, setHasWon] = useState(0);
  const [turn, setTurn] = useState(1);

  function onStart() {
    setPlayer1(prompt("Enter name of player 1"));
    setPlayer2(prompt("Enter name of player 2"));
    setTurn(1);
  }

  useEffect(() => {
    if(hasWon) alert('winner!');
  }, [hasWon])

  return (
    <div className="App">
      <h1 className='heading'>Connect 4!</h1>
      <br />
      <div className='test-app-div'>
        <PlayerCard id={1} player={player1} />
        <Board 
          setHasWon={setHasWon}
          turn={turn} 
          setTurn={setTurn} 
          onStart={onStart} />
        <PlayerCard id={2} player={player2} />
      </div>
    </div>
  );
}

export default App;
