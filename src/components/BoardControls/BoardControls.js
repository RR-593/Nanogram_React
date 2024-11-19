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
		clearGame,
		clearBoard,
    handleGameWon
	} = useGameContext();

  const [confetti, setConfetti] = useState(<></>);

  const checkBoardAction = () => {
    var isWon = handleGameWon()
    console.log(isWon);
    if (isWon) setConfetti(<Confetti_Cone/>)
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
      <button>
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