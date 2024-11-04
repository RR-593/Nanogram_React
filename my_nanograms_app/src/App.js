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
const generateClueForCollumnsArr = (nanogramArr) => {
  return nanogramArr[0].map((_, col) => {
      const counts = [];
      let count = 0;

      for (const row of nanogramArr) 
        count = row[col] === 1 ? 
        count + 1 : 
        (count ? 
          (counts.push(count), 0) : 
          count
        )
      

      if (count) counts.push(count);
      return counts;
  });
}
const generateClueForRowsArr = (nanogramArr) => nanogramArr.map( row => {
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

  let size = 8
  let nanogramArr = generateNanogramArr(size)
  let clueRows = generateClueForRowsArr(nanogramArr)
  let clueCols = generateClueForCollumnsArr(nanogramArr)
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <StatsProvider >
          <BoardButtons />
          <NanoBoard size={size} clueRows={clueRows} clueCols={clueCols} />
        </StatsProvider>
        
      </div>
    </div>
  );
}

export default App;
