import { useEffect, useState, createContext } from 'react'
import './nanogram-board.css';
import Tile from './Tile'
import Clue from './Clue'

export default function NanoBoard(props){
  const [boardOfRows, setRows] = useState()
    
  var boardSize =  Number(props.size)
  
  return (
    <div className="nanogram-board">
      {Array.from(Array(boardSize)).map( (row,index) => (
        <div key={index} className="row">
          {Array.from(Array(boardSize)).map((x,index) => (<Tile key={index} size={boardSize}/>))}
          <Clue size={boardSize} index={index}/>
        </div>
      ))}
      <div className="row">
        {Array.from(Array(boardSize)).map((x,index) => (<Clue key={index} size={boardSize} index={index} vert="true"/>))}
      </div>
    </div>
  )

}