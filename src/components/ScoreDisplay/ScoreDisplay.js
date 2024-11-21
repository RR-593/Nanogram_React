import useGameContext from "../../contexts/GameContext"
import './ScoreDisplay.css'

const ScoreDisplay = () => {

	const {
		rating	} = useGameContext();


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