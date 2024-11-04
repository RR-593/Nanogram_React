import { useEffect, useState, createContext } from 'react'
import './nanogram-board.css';
import Tile from './Tile'
import Clue from './Clue'

export default function NanoBoard(props){
  const boardSize = Number(props.size);
  
  const [boardRows, setRows] = useState([]);
  const [boardCols, setCols] = useState([]);
  const [colClues, setColClues] = useState([]);
  const [rowClues, setRowClues] = useState([]);

  // Effect to clear and reset the board when count changes
  useEffect(() => {
    console.log("Clear");
    // Clear the board
    setRows([]);
    setCols([]);
    setColClues([]);
    setRowClues([]);

    // Reinitialize after clearing
    if (boardSize > 0) {
      const bArr = Array.from({ length: boardSize });
      setRows(bArr);
      setCols([...Array(5)].map((_, index) => <Tile key={index} size={boardSize} />));
      setColClues([[1, 1, 1], [4], [3], [1, 1], [0]]);
      setRowClues([[2], [1], [1, 2, 1], [1], [0]]);
    }
  }, [props.count, boardSize]);
  
  
  
  return (
    <div className="nanogram-board" count={props.count}>
      {boardRows.map( (row,index) => (
        <div key={index} className="row">
          {boardCols}
          <Clue size={boardSize} index={index} clueNumber={colClues[index]}/>
          {console.log(boardCols)}
        </div>
      ))}
      <div className="row">
        {[...Array(boardSize)].map((x,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={rowClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}