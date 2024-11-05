import { useEffect, useState, useContext } from 'react'
import $ from 'jquery'
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import {useActiveBoardContext} from '../ActiveBoardProvider'
import './BoardButtons.css'

import {compare2DArrays, toString2DArray} from '../helper_funcs/arrayFunctions.js'

const BoardButtons = (props) => {
  
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  const [board, updateBoard] = useActiveBoardContext();

  let clearBoardAction = ()=>{
    updateGStats({...game_stats, clear: !game_stats.clear})
  }

  let submitBoardAction = ()=>{
    console.log(compare2DArrays(board,nanogram.nanogramArr)?"Correct!":"Incorrect")
    console.log(toString2DArray(board)+"\n\n"+toString2DArray(nanogram.nanogramArr))
  }

  let newBoardAction = ()=>{
    let getInput = Number($("input[name='input_board_size']").val())
    let new_size = getInput > game_stats.default_board_size ? getInput : game_stats.default_board_size

    setNewNanogram({size: new_size})
  }

  let newBoardB = (
    <div className="newBoardInputs">
    <input name="input_board_size" type="text" placeholder={game_stats.default_board_size}></input>
    <button onClick={newBoardAction}>
      <span>
        <i className="fa fa-plus fa-1x"></i>
      </span>
    </button>
    </div>
  )

  let clearBoardB = (
    <button onClick={clearBoardAction}>
      <span style={{ display: "flex", justifyContent: "center", gap: "20px"}} >
        {/* <i class="fa fa-file-o fa-1x" ></i> */}
        Clear
      </span>
    </button>
  )

  let submitBoardB = (
    <button onClick={submitBoardAction}>
      <span>
        Check
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