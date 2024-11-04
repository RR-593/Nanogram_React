import { useEffect, useState } from 'react'
import './App.css';

import DisplayNanoBoard from './components/NanoBoard/DisplayNanoBoard';
import BoardButtons from './components/BoardButtons/BoardButtons';
import StatsProvider from './components/StatsProvider'
import NanogramProvider from './components/NanogramProvider';
import ActiveBoardProvider from './components/ActiveBoardProvider'

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])


  let size = 4

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <StatsProvider >
          <NanogramProvider>
            <ActiveBoardProvider>
              <BoardButtons />
              <DisplayNanoBoard />
            </ActiveBoardProvider>
          </NanogramProvider>
        </StatsProvider>
      </div>
    </div>
  );
}

export default App;
