import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { TimerProvider } from './contexts/TimerContext';
import RankUpModal from './components/Modals/RankUpModal';

function App() {
  // console.log("load")
  return (
    <GameProvider>
      <TimerProvider>
        <Outlet />
        <RankUpModal />
      </TimerProvider>
    </GameProvider>
  );
}



export default App;
