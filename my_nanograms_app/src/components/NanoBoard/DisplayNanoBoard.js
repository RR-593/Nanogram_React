import { useEffect, useState, useContext } from 'react'
import './DisplayNanoBoard.css';
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import Tile from '../Tile/Tile'
import Clue from '../Clue/Clue'

export default function DisplayNanoBoard(){
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  var boardSize = nanogram.size? nanogram.size : game_stats.default_board_size

  const [colClues, setColClues] = useState([]);
  const [rowClues, setRowClues] = useState([]);

  // Effect to clear and reset the board when count changes
  useEffect(() => {
    
    // Clear the board
    setColClues([]);
    setRowClues([]);

    // Reinitialize after clearing
    if (boardSize > 0) {
      setColClues(nanogram.clue.cols);
      setRowClues(nanogram.clue.rows);
    }
  }, [nanogram]);
  
  
  return (
    <div className="nanogram-board">
      {[...Array(boardSize)].map((_, rowIndex) =>
        <div key={rowIndex} className="row">
          {[...Array(boardSize)].map((_, colIndex) => <Tile key={colIndex} id={[rowIndex,colIndex]}/>)}
          <Clue size={boardSize} index={rowIndex} clueNumber={rowClues[rowIndex]}/>
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((_,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={colClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}