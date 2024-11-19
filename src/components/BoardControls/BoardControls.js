import { useEffect, useState, useContext } from 'react'
import useGameContext from '../../contexts/GameContext'
import $ from 'jquery'

import './BoardControls.css'
import Confetti_Cone from '../Confetti/Confetti_Cone'

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
    if (handleGameWon()) setConfetti(<Confetti_Cone/>)
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

  return (
    <div className="board-controls-container">
      {checkBoardButton}
      {eraseBoardButton}
      {confetti}
    </div>
  )
}

export default BoardControls