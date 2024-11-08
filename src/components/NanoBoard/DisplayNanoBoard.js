import { useEffect, useState, useContext } from 'react'
import './DisplayNanoBoard.css';
import {useStatsContext} from '../Providers/StatsProvider'
import {useNanogramContext} from '../Providers/NanogramProvider'
import $ from 'jquery'
import Tile from './Tile/Tile'
import Clue from './Clue/Clue'

export default function DisplayNanoBoard(){
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();

  var boardSize = nanogram.size? nanogram.size : game_stats.default_board_size

  useEffect(()=>{
    $(".tile, .clue").css("border-width", 4 - (nanogram.size >= 10 ? parseInt(nanogram.size.toString()[0]) : 0));
  },[nanogram])
  
  
  return (
    <div className="nanogram-board">
      {[...Array(boardSize)].map((_, rowIndex) =>
        <div key={rowIndex} className="row">
          {[...Array(boardSize)].map((_, colIndex) => <Tile key={colIndex} id={[rowIndex,colIndex]}/>)}
          <Clue size={boardSize} index={rowIndex} direction="row"/>
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((_,index) => (<Clue key={index} size={boardSize} index={index} direction="col"/>))}
      </div>
    </div>
  )

}