import { useEffect, useState, createContext } from 'react'
import './App.css';

import NanoBoard from './components/nanogram-board';

function BoardButtons(props){
  return(
    <div className="boardButtBox">
      <button ></button>
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


  return (
    <div className="App">
      <header className="App-header">
        <h1>Nanogram</h1>
      </header>
      <div className="GameInterface">
        {/* <BoardButtons /> */}
        <NanoBoard size="5"/>
      </div>
    </div>
  );
}

export default App;
