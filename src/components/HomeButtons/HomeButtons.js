import React, { useState, useEffect } from 'react';
import useGameContext from '../../contexts/GameContext'
import { Link, Outlet } from 'react-router-dom';
import './HomeButtons.css'
import SettingsButton from './SettingsButton';
import SelectBoardButton from './SelectBoardButton';
import TrophieButton from './TrophieButton';


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

    clearBoard
  } = useGameContext();

  const continueButton = (
    <Link to="Game">
      <button className="HomeButton" id="continue">Continue</button>
    </Link>
  )

  const [continueBox, setContinueBox] = useState(continueButton);

  useEffect(() => {
    var cb = currentBoard
    var isEmpty = cb.flat().every(element => element === 0);
    if (isEmpty) setContinueBox(<></>)
    else setContinueBox(continueButton)
  }, []);

  return (
    <div className="HomeButtonBox">
      {continueBox}
      <SelectBoardButton />
      <TrophieButton />
      <SettingsButton />
    </div>
  );
}

export default HomeButtons;