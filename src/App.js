import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext'; // Assuming GameContext is set up
import { TimerProvider } from './contexts/TimerContext';
import RankUpModal from './components/Modals/RankUpModal';
// import SettingsPage from './components/SettingsPage';
// import GamePage from './components/GamePage';

function App() {
  // console.log("load")
  return (
    <TimerProvider>
      <GameProvider>
        <Outlet />
        <RankUpModal />
      </GameProvider>
    </TimerProvider>
  );
}



export default App;
