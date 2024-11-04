import { useEffect, useState, useContext } from 'react'
import {useStatsContext} from '../StatsProvider'

const BoardButtons = (props) => {
  const [game_stats, updateGStats] = useStatsContext();

  let clearBoard = ()=>{
    updateGStats({...game_stats, board_count: game_stats.board_count+1})
  }
  return(
    <div className="boardButtBox">
      <button onClick={clearBoard}>
        <span>
          Clear Board
        </span>
      </button>
    </div>
  )
}

export default BoardButtons