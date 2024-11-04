import { useEffect, useState, useContext } from 'react'
import $ from 'jquery'
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import './BoardButtons.css'

const BoardButtons = (props) => {
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();

  let clearBoardAction = ()=>{
    updateGStats({...game_stats, board_count: game_stats.board_count+1})
  }

  let submitBoardAction = ()=>{
    
  }

  let newBoardAction = ()=>{
    let getInput = Number($("input[name='input_board_size']").val())
    let new_size = getInput > 4 ? getInput : 4

    setNewNanogram({size: new_size})
  }

  let newBoardB = (
    <div>
    <input name="input_board_size" type="text" placeholder="4"></input>
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