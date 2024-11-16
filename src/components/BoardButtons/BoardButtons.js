import { useEffect, useState, useContext } from 'react'
import $ from 'jquery'
import { useStatsContext, save_stats } from '../Providers/StatsProvider.js'
import { useNanogramContext } from '../Providers/NanogramProvider.js'
import { useActiveBoardContext } from '../Providers/ActiveBoardProvider.js'
import './BoardButtons.css'

import { compareNanograms, toString2DArray } from '../Array_functions/arrayFunctions.js'

const BoardButtons = (props) => {

  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  const [board, updateBoard] = useActiveBoardContext();

  const [difficulties, setdifficulties] = useState({
    easy: (<button className="unlockDifficulty" onClick={() => { unlockDifficulty("easy", 9) }}>💰9</button>),
    normal: (<button className="unlockDifficulty" onClick={() => { unlockDifficulty("normal", 15) }}>💰15</button>),
    hard: (<button className="unlockDifficulty" onClick={() => { unlockDifficulty("hard", 30) }}>💰30</button>)
  });

  let updateUnlockDifficulty = (unlocked_difficulties) => {
    if(!(unlocked_difficulties.constructor === Array)) return
    const tempDiffs = { ...difficulties }
    for (let diff of unlocked_difficulties) {
      switch (diff) {
        case "easy":
          tempDiffs.easy = (
            <label>
              <input type="radio" name="difficulty" className="easy" />
              <span></span><div id="text">🙂</div>
            </label>
          )
          break;
        case "normal":
          tempDiffs.normal = (
            <label>
              <input type="radio" name="difficulty" className="normal" />
              <span></span><div id="text">🔶</div>
            </label>
          )
          break;
        case "hard":
          tempDiffs.hard = (
            <label>
              <input type="radio" name="difficulty" className="hard" />
              <span></span><div id="text">🔥</div>
            </label>
          )
          break;
      }
    }
    setdifficulties(tempDiffs)
  }

  useEffect(() => {
    const updated_stats = JSON.parse(localStorage.getItem('stats'));
    if(!updated_stats) return
    updateUnlockDifficulty(updated_stats.unlocks.difficulty)
  }, [game_stats.load]);

  let clearBoardAction = () => {
    updateGStats({ ...game_stats, clear: !game_stats.clear })
  }

  let submitBoardAction = () => {
    let isNonoCorrect = compareNanograms(board, nanogram.nanogramArr)
    if (!isNonoCorrect) return
    updateGStats({ ...game_stats, complete_puzzle: compareNanograms(board, nanogram.nanogramArr) })
    // console.log(compareNanograms(board,nanogram.nanogramArr)?"Correct!":"Incorrect")
    // console.log(toString2DArray(board)+"\n\n"+toString2DArray(nanogram.nanogramArr))
  }

  let newBoardAction = () => {
    let getInput = Number($("input[name='input_board_size']").val())
    getInput = getInput > 25 ? 25 :
      typeof getInput !== "undefined" && getInput > game_stats.default_board_size ? getInput :
        game_stats.default_board_size

    $("input[name='input_board_size']").val(getInput)

    updateGStats({ ...game_stats, complete_puzzle: false })
    setNewNanogram({ size: getInput })
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
      <span style={{ display: "flex", justifyContent: "center", gap: "20px" }} >
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

  let unlockDifficulty = (difficulty, cost) => {
    const updated_stats = JSON.parse(localStorage.getItem('stats'));
    console.log(updated_stats);
    console.log(updated_stats.unlocks.difficulty.includes(difficulty));

    if (!(updated_stats.currencies.basicMonies >= cost)) return
    if (updated_stats.unlocks.difficulty.includes(difficulty)) return
    updated_stats.unlocks.difficulty.push(difficulty)

    updated_stats.currencies.basicMonies -= cost

    updateGStats({ ...updated_stats })

    save_stats(updated_stats)

    updateUnlockDifficulty(updated_stats.unlocks.difficulty)

  }


  return (
    <div className="boardButtBox">
      {newBoardB}
      {clearBoardB}
      {submitBoardB}
      <span>Difficulty</span>
      <div className="difficultyButts">
        {difficulties.easy}
        {difficulties.normal}
        {difficulties.hard}
      </div>
    </div>
  )
}

export default BoardButtons