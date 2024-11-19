import { useEffect, useState, useContext } from 'react'
import useGameContext from '../../contexts/GameContext'
import $ from 'jquery'

import './BoardControls.css'
import Confetti_Cone from '../Confetti/Confetti_Cone'
import SelectBoardButton from '../HomeButtons/SelectBoardButton'
import TrophieButton from '../HomeButtons/TrophieButton'

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

  const [confetti, setConfetti] = useState(<></>);

  const checkBoardAction = () => {
    if (handleGameWon()) setboardControllers(wonControls)
  }

  const clearBoardAction = () => {
    console.log(gameState);
    if (gameState === "playing") clearBoard()
  }

  useEffect(() => {
    setConfetti(<></>)
  }, [nonogram]);

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




  return boardControllers

}

export default BoardControls