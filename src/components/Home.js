import React,{useState, useEffect} from 'react';
import useGameContext from '../contexts/GameContext'
import HomeButtons from './HomeButtons/HomeButtons';

function Home() {
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
		 
		clearBoard
	} = useGameContext();

  return (
    <div className="HomeBox">
        <div className="scoreANDrecentBoard"> </div>
        <HomeButtons />
        <div className="BestBoards"></div>
    </div>
  );
}

export default Home;