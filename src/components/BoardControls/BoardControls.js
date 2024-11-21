import { useEffect, useState } from 'react'
import useGameContext from '../../contexts/GameContext'

import './BoardControls.css'
import Confetti_Cone from '../Confetti/Confetti_Cone'
import SelectBoardButton from '../HomeButtons/SelectBoardButton'
import TrophieButton from '../HomeButtons/TrophieButton'

const BoardControls = () => {
  const {
    gameState,
    nonogram,
    clearBoard,
    handleGameWon
  } = useGameContext();


  const checkBoardAction = () => {
    if (handleGameWon()) setboardControllers(wonControls)
  }

  const clearBoardAction = () => {
    console.log(gameState);
    if (gameState === "playing") clearBoard()
  }

  const checkBoardButton = (
    <div className="check-board-buton control-button">
      <button onClick={checkBoardAction}>
        <i className="fa fa-check-square-o fa-2x"></i>
        <span>Check Board</span>
      </button>
    </div>
  )

  const eraseBoardButton = (
    <div className="erase-board-button control-button">
      <button onClick={clearBoardAction}>
        <i className="fa  fa-eraser fa-2x"></i>
        <span>Earase Board</span>
      </button>
    </div>
  )

  const newBoardButton = (
    <div className="new-board-button">
      <SelectBoardButton />
    </div>
  )


  const playingControls = (
    <div className="board-controls-container playing">
      {checkBoardButton}
      {eraseBoardButton}
    </div>
  )

  const wonControls = (
    <div className="board-controls-container won">
      {newBoardButton}
      <TrophieButton />
      <div className="confetti-container">
        <Confetti_Cone />
      </div>
    </div>
  )

  const wichControls = () => gameState !== "won" ? playingControls : wonControls;
  
  const [boardControllers, setboardControllers] = useState(wichControls());


  useEffect(() => {
    setboardControllers( wichControls())
  }, [gameState]);







  return boardControllers

}

export default BoardControls