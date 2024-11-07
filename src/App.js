import { useEffect, useState } from 'react'
import './App.css';

import StatsProvider from './components/StatsProvider'
import NanogramProvider from './components/NanogramProvider';
import ActiveBoardProvider from './components/ActiveBoardProvider'

import CurrencyBox from './components/CurrencyBox/CurrencyBox';
import DisplayNanoBoard from './components/NanoBoard/DisplayNanoBoard';
import BoardButtons from './components/BoardButtons/BoardButtons';
import Confetti_Cone from './components/Confetti/Confetti_Cone'

function App() {
  let size = 4

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nonograms</h1>
      </header>
      <StatsProvider >
        <NanogramProvider>
          <ActiveBoardProvider>
            <div className="gameBox">
              <CurrencyBox />
              <div className="GameInterface">
                <BoardButtons />
                <DisplayNanoBoard />
                <Confetti_Cone />
              </div>
            </div>
          </ActiveBoardProvider>
        </NanogramProvider>
      </StatsProvider>
    </div>
  );
}

export default App;
