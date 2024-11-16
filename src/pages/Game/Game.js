import { useEffect, useState, useContext } from 'react'
import useGameContext from '../../contexts/GameContext'
import DisplayNanoBoard from '../../components/NanoBoard/DisplayNanoBoard'
import './Game.css'

const GamePage = () => {
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
		clearBoard
	} = useGameContext();

	return (
		<div className="GameInterface">
			<div className="SidePannel">
				{/* game name */}
				{/* score */}
				{/* timer */}
				{/* board buttons */}
				{/* setings */}
			</div>
			<DisplayNanoBoard/>
		</div>
	)

}

export default GamePage