import React, { useState, useEffect } from 'react';
import useGameContext from '../../contexts/GameContext'
import { Link, Outlet } from 'react-router-dom';
import './HomeButtons.css'
import SettingsButton from './SettingsButton';

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

  return (
    <div className="HomeButtonBox">
      <Link to="Game">
        <button className="HomeButton" id="continue">Continue</button>
      </Link>
      <Link to="SelectBoard">
        <button className="HomeButton" id="new">New Board</button>
      </Link>
      <button className="HomeButton" id="trophie">Trophies</button>
      <SettingsButton />
    </div>
  );
}

export default HomeButtons;