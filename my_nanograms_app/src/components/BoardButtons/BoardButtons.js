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

  let newBoardAction = ()=>{
    let new_size = $("intput[name='input_board_size']")
    console.log(new_size)
  }

  let newBoardB = (
    <div>
    <input name="input_board_size" type="text"></input>
    <button onClick={newBoardAction}>
      <span>
        New Board
      </span>
    </button>
    </div>
  )

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
      {newBoardB}
      {clearBoardB}
      {submitBoardB}
    </div>
  )
}

export default BoardButtons