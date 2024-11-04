import { useEffect, useState, useContext } from 'react'
import './NanoBoard.css';
import {useStatsContext} from '../StatsProvider'
import Tile from '../Tile/Tile'
import Clue from '../Clue/Clue'

export default function NanoBoard(props){
  const [game_stats, updateGStats] = useStatsContext();
  const boardSize = Number(props.size);
  const clueRows = props.clueRows;
  
  const [board, setBoard] = useState([]);
  const [colClues, setColClues] = useState([]);
  const [rowClues, setRowClues] = useState([]);

  // Effect to clear and reset the board when count changes
  useEffect(() => {

    // Clear the board
    setBoard([]);
    setColClues([]);
    setRowClues([]);

    // Reinitialize after clearing
    if (boardSize > 0) {
      setColClues([[1, 1, 1], [4], [3], [1, 1], [0]]);
      setRowClues(clueRows);

      setBoard([...Array(boardSize)].map((_, index) => <Tile key={index} size={boardSize} clear={game_stats.board_count} />));
    }
  }, [game_stats.board_count, boardSize]);
  
  
  
  return (
    <div className="nanogram-board" count={game_stats.board_count}>
      {[...Array(boardSize)].map((_, index) =>
        <div key={index} className="row">
          {board}
          <Clue size={boardSize} index={index} clueNumber={rowClues[index]}/>
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((x,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={colClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}