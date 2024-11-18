import React,{useState, useEffect} from 'react';
import useGameContext from '../contexts/GameContext'
import { Link , Outlet} from 'react-router-dom';
import './TitlePage.css'
import GameTitle from '../components/GameTitle/GameTitle';
import Home from '../components/Home';

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
    startNewGame(8)
  }


  return (
    <div className="title-page">
      <GameTitle/>
      <Home/>
    </div>
  );
}

export default TitlePage;