import { useEffect, useState, useContext } from 'react'
import './NanoBoard.css';
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import Tile from '../Tile/Tile'
import Clue from '../Clue/Clue'

export default function NanoBoard(props){
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  var boardSize = nanogram.size? nanogram.size : 4
  

  const [board, setBoard] = useState([]);
  const [colClues, setColClues] = useState([]);
  const [rowClues, setRowClues] = useState([]);


  // Effect to clear and reset the board when count changes
  useEffect(() => {
    // boardSize = nanogram.size
    // Clear the board
    setBoard([]);
    setColClues([]);
    setRowClues([]);

    // Reinitialize after clearing
    if (boardSize > 0) {
      setColClues(nanogram.clue.cols);
      setRowClues(nanogram.clue.rows);

      setBoard([...Array(boardSize)].map((_, index) => <Tile key={index} size={boardSize} clear={game_stats.clear} />));
    }
  }, [game_stats.clear,nanogram]);
  
  
  
  return (
    <div className="nanogram-board">
      {[...Array(boardSize)].map((_, index) =>
        <div key={index} className="row">
          {board}
          <Clue size={boardSize} index={index} clueNumber={rowClues[index]}/>
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((_,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={colClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}