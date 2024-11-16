import React,{useState, useEffect} from 'react';
import useGameContext from '../contexts/GameContext'
import { Link } from 'react-router-dom';

function TitlePage() {
  const {
		gameState,
		setGameState,
		score,
		setScore,
		globalSettings,
		nonogram,
		currentBoard,
		setCurrentBoard,
		startNewGame,
		clearGame,
		clearBoard
	} = useGameContext();

  const [newGame, setnewGame] = useState(0);

  const newGameAction = () => {
    startNewGame(4)
  }


  return (
    <div className="title-page">
      <h1>Nonogram Game</h1>
      <p>Welcome to the Nonogram puzzle game!</p>
      <Link to="/Game">
        <button onClick={newGameAction}>New Game</button>
      </Link>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default TitlePage;