import React from 'react';
import './App.css';

// import StatsProvider from './components/Providers/StatsProvider'
// import NanogramProvider from './components/Providers/NanogramProvider';
// import ActiveBoardProvider from './components/Providers/ActiveBoardProvider'

// import CurrencyBox from './components/CurrencyBox/CurrencyBox';
// import DisplayNanoBoard from './components/NanoBoard/DisplayNanoBoard';
// import Version from './components/Unlocks/Version/Version';
// import BoardButtons from './components/BoardButtons/BoardButtons';
// import Confetti_Cone from './components/Confetti/Confetti_Cone'

// function App() {
//   return (

//     <div className="App">
//       <header className="App-header">
//         <h1>Nonograms</h1>
//       </header>
//       <StatsProvider >
//         <NanogramProvider>
//           <ActiveBoardProvider>
//             <div className="gameBox">
//               <CurrencyBox />
//               <div className="GameInterface">
//                 <BoardButtons />
//                 <DisplayNanoBoard />
//                 <Version />
//               </div>
//               <Confetti_Cone />
//             </div>
//           </ActiveBoardProvider>
//         </NanogramProvider>
//       </StatsProvider>
//     </div>
//   );
// }

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext'; // Assuming GameContext is set up
import TitlePage from './pages/TitlePage';
import SettingsPage from './components/SettingsPage';
import GamePage from './components/GamePage';

function App() {
  console.log("load")
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          {/* <Route path="/settings" element={<SettingsPage />} />
          <Route path="/game" element={<GamePage />} /> */}
        </Routes>
      </GameProvider>
    </Router>
  );
}



export default App;
