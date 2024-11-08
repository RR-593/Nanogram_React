import { useEffect, useState } from 'react'
import './App.css';

import StatsProvider from './components/Providers/StatsProvider'
import NanogramProvider from './components/Providers/NanogramProvider';
import ActiveBoardProvider from './components/Providers/ActiveBoardProvider'

import CurrencyBox from './components/CurrencyBox/CurrencyBox';
import DisplayNanoBoard from './components/NanoBoard/DisplayNanoBoard';
import Version from './components/Unlocks/Version/Version';
import BoardButtons from './components/BoardButtons/BoardButtons';
import Confetti_Cone from './components/Confetti/Confetti_Cone'

function App() {
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
                <Version/>
              </div>
              <Confetti_Cone />
            </div>
          </ActiveBoardProvider>
        </NanogramProvider>
      </StatsProvider>
    </div>
  );
}

export default App;
