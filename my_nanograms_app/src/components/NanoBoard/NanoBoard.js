import { useEffect, useState, createContext } from 'react'
import './NanoBoard.css';
import Tile from '../Tile/Tile'
import Clue from '../Clue/Clue'

export default function NanoBoard(props){
  const boardSize = Number(props.size);
  
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
      setRowClues([[2], [1], [1, 2, 1], [1], [0]]);

      setBoard([...Array(boardSize)].map((_, index) => <Tile key={index} size={boardSize} clear={props.count} />));
    }
  }, [props.count, boardSize]);
  
  
  
  return (
    <div className="nanogram-board" count={props.count}>
      {[...Array(boardSize)].map((_, index) =>
        <div key={index} className="row">
          {board}
          <Clue size={boardSize} index={index} clueNumber={colClues[index]}/>
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((x,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={rowClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}