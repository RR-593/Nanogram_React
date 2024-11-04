import { useEffect, useState } from 'react'
import './App.css';

import NanoBoard from './components/NanoBoard/NanoBoard';
import BoardButtons from './components/BoardButtons/BoardButtons';
import StatsProvider from './components/StatsProvider'

const nanogram = {
  size: 0,
  clues: {
    row: [],
    col: []
  }
}

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <StatsProvider >
          <BoardButtons />
          <NanoBoard size="5"/>
        </StatsProvider>
        
      </div>
    </div>
  );
}

export default App;
