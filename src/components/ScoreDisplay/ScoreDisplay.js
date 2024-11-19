import useGameContext from "../../contexts/GameContext"

const ScoreDisplay = () => {

  const {
		gameState,
		setGameState,
		rating,
		setRating,
		globalSettings,
		nonogram,
		currentBoard,
		setCurrentBoard,
		startNewGame,
		clearBoard
	} = useGameContext();


	return (
		<div className="score-container">
			<span>SCORE</span>
			<div className="score-total">
				<span>{rating}</span>
			</div>
		</div>
	)
}

export default ScoreDisplay;