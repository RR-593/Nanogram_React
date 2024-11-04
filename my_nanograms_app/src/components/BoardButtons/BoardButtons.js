import { useEffect, useState, useContext } from 'react'
import {useStatsContext} from '../StatsProvider'
import './BoardButtons.css'

const BoardButtons = (props) => {
  const [game_stats, updateGStats] = useStatsContext();

  let clearBoardAction = ()=>{
    updateGStats({...game_stats, board_count: game_stats.board_count+1})
  }

  let submitBoardAction = ()=>{
    
  }

  let clearBoardB = (
    <button onClick={clearBoardAction}>
      <span>
        Clear Board
      </span>
    </button>
  )

  let submitBoardB = (
    <button onClick={submitBoardAction}>
      <span>
        Check Board
      </span>
    </button>
  )
  return(
    <div className="boardButtBox">
      {clearBoardB}
      {submitBoardB}
    </div>
  )
}

export default BoardButtons