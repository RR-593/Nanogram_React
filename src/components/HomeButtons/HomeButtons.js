import React,{useState, useEffect} from 'react';
import useGameContext from '../../contexts/GameContext'
import './HomeButtons.css'

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
    <div className="HomeButtonBox">
        <button className="HomeButton" id="continue">Continue</button>
        <button className="HomeButton" id="new">New Board</button>
        <button className="HomeButton" id="trophie">Trophies</button>
        <button className="HomeButton" id="settings">Settings</button>
    </div>
  );
}

export default HomeButtons;