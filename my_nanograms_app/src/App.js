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

const generateNanogramArr = (size) => Array.from({ length: size }, () => Array.from({ length: size }, () => Math.round(Math.random())))
const generateNanogramClueForRowsArr = (nanogramArr) => nanogramArr.map( row => {
  const counts = [];
  let count = 0;

  row.forEach(value => {
      if (value === 1) count++;
      else if (count) {
        counts.push(count)
        count = 0;
      }
  });

  if (count) counts.push(count);
  return counts;
})

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  let size = 4
  let nanogramArr = generateNanogramArr(size)
  let clueRows = generateNanogramClueForRowsArr(nanogramArr)
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <StatsProvider >
          <BoardButtons />
          <NanoBoard size={size} clueRows={clueRows} />
        </StatsProvider>
        
      </div>
    </div>
  );
}

export default App;
