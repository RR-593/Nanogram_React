import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext'; // Assuming GameContext is set up
// import SettingsPage from './components/SettingsPage';
// import GamePage from './components/GamePage';

function App() {
  // console.log("load")
  return (
    <GameProvider>
      <Outlet />
      
    </GameProvider>
  );
}



export default App;
