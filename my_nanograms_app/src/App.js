import { useEffect, useState } from 'react'
import './App.css';

import NanoBoard from './components/NanoBoard/NanoBoard';
import BoardButtons from './components/BoardButtons/BoardButtons';
import StatsProvider from './components/StatsProvider'
import NanogramProvider from './components/NanogramProvider';
import {useNanogramContext} from './components/NanogramProvider';

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])


  let size = 12

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <NanogramProvider>
          <StatsProvider >
            <BoardButtons />
            <NanoBoard size={size}/>
          </StatsProvider>
        </NanogramProvider>
      </div>
    </div>
  );
}

export default App;
