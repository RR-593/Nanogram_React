import { useEffect, useState, useContext } from 'react'
import useGameContext from '../../contexts/GameContext'
import $ from 'jquery'

import './BoardControls.css'
import Confetti_Cone from '../Confetti/Confetti_Cone'
import SelectBoardButton from '../HomeButtons/SelectBoardButton'
import TrophieButton from '../HomeButtons/TrophieButton'
import useTimerContext from '../../contexts/TimerContext'

const BoardControls = () => {
  const {
    gameState,
    setGameState,
    score,
    setScore,
    globalSettings,
    nonogram,
    currentBoard,
    setCurrentBoard,
    startNewGame,
    clearBoard,
    handleGameWon
  } = useGameContext();

  const {stopTimer} = useTimerContext()


  const checkBoardAction = () => {
    if (handleGameWon()) {
      stopTimer()
      setboardControllers(wonControls)
    }
  }

  const clearBoardAction = () => {
    console.log(gameState);
    if (gameState === "playing") clearBoard()
  }

  const checkBoardButton = (
    <div className="check-board-buton">
      <button onClick={checkBoardAction}>
        <i className="fa fa-check-square-o"></i>
      </button>
    </div>
  )

  const eraseBoardButton = (
    <div className="erase-board-buton">
      <button onClick={clearBoardAction}>
        <i className="fa  fa-eraser"></i>
      </button>
    </div>
  )

  const newBoardButton = (
    <div className="new-board-buton">
      <SelectBoardButton />
    </div>
  )


  const playingControls = (
    <div className="board-playing-controls-container">
      {checkBoardButton}
      {eraseBoardButton}
    </div>
  )

  const wonControls = (
    <div className="board-won-controls-container">
      {newBoardButton}
      <TrophieButton />
      <div className="confetti-container">
        <Confetti_Cone />
      </div>
    </div>
  )

  const [boardControllers, setboardControllers] = useState(playingControls);


  useEffect(() => {
    setboardControllers(playingControls)
  }, [nonogram]);




  return boardControllers

}

export default BoardControls