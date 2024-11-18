import React,{useState, useEffect} from 'react';
import useGameContext from '../../contexts/GameContext'

function HomeButtons() {
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

  return (
    <div className="HomeButtons">
        <button>Continue</button>
        <button>New Board</button>
        <button>Trophies</button>
        <button>Settings</button>
    </div>
  );
}

export default HomeButtons;