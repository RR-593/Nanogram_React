import { useEffect, useState, useContext } from 'react'
import $ from 'jquery'
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import {useActiveBoardContext} from '../ActiveBoardProvider'
import './BoardButtons.css'

const BoardButtons = (props) => {
  
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  const [board, updateBoard] = useActiveBoardContext();

  let clearBoardAction = ()=>{
    updateGStats({...game_stats, clear: !game_stats.clear})
  }

  let submitBoardAction = ()=>{
    var compareArr2D = (array1, array2) => {
      if (array1.length !== array2.length) return false; // Different number of rows
  
      return array1.every((row, rowIndex) => (
          row.length !== array2[rowIndex].length) ? 
          false: // Different number of columns in a row
          row.every((value, colIndex) => value === array2[rowIndex][colIndex]
        )
      );
    }

    var array2dToString = (array) => {
      // Convert the 2D array to the desired string format
      const arrayString = array.map(row => row.join('')).join('\n');
      return `${arrayString}`;
    }

    console.log(compareArr2D(board,nanogram.nanogramArr)?"Correct!":"Incorrect")
    // console.log(array2dToString(board)+"\n\n"+array2dToString(nanogram.nanogramArr))
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