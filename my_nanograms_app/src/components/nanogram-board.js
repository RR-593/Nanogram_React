import { useEffect, useState, createContext } from 'react'
import './nanogram-board.css';
import Tile from './Tile'
import Clue from './Clue'

export default function NanoBoard(props){
  var boardSize =  Number(props.size)
  let bArr = Array.from(Array(boardSize))
  const [boardRows, setRows] = useState(bArr)
  const [boardCols, setCols] = useState(bArr)
  // const [colClues, setColClues] = useState(Array.from(Array(boardSize)))
  // const [rowClues, setRowClues] = useState(bArr)

  useEffect(() => {
    setRows(bArr)
    setCols(bArr)
  }, [props.size]);

  let colClues = [[1,1,1],[4],[3],[1,1],[0]]
  let rowClues = [[2],[1],[1,2,1],[1],[0]]
  
  
  return (
    <div className="nanogram-board">
      {boardRows.map( (row,index) => (
        <div key={index} className="row">
          {boardCols.map((x,index) => (<Tile key={index} size={boardSize}/>))}
          <Clue size={boardSize} index={index} clueNumber={colClues[index]}/>
        </div>
      ))}
      <div className="row">
        {Array.from(Array(boardSize)).map((x,index) => (<Clue key={index} size={boardSize} index={index} clueNumber={rowClues[index]} vert="true"/>))}
      </div>
    </div>
  )

}