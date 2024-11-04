import { useEffect, useState, createContext, useContext } from 'react'
import './App.css';

import NanoBoard from './components/NanoBoard/NanoBoard';

const statsContext = createContext()

const nanogram = {
  size: 0,
  clues: {
    row: [],
    col: []
  }
}


function BoardButtons(props){
  const [game_stats, updateGStats] = useContext(statsContext);

  let clearBoard = ()=>{
    updateGStats({...game_stats, board_count: game_stats.board_count+1})
  }
  return(
    <div className="boardButtBox">
      <button onClick={clearBoard}>
        <span>
          Clear Board
        </span>
      </button>
    </div>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  const [game_stats, setGStats] = useState({
    board_count: 0
  })
  const updateGStats = (newValue) => {
    setGStats(newValue);
  };
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        <statsContext.Provider value={[game_stats, updateGStats]}>
          <BoardButtons />
          <NanoBoard size="5" count={game_stats.board_count}/>
        </statsContext.Provider>
        
      </div>
    </div>
  );
}

export default App;
