import useGameContext from '../../contexts/GameContext'
import DisplayNonoBoard from '../../components/NonoBoard/DisplayNonoBoard'
import './Game.css'
import BoardControls from '../../components/BoardControls/BoardControls'
import SettingsButton from '../../components/HomeButtons/SettingsButton'
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay'
import TimerDisplay from '../../components/TimerDisplay/TimerDisplay.js';


const GamePage = () => {

	const {
		nonogram
	} = useGameContext();


	return (
		<div className="GameInterface">
			<div className="SidePannel">
				<div style={{ width: "100%" }}>
					<h1 style={{ marginTop: 0 }}>{nonogram.size}x{nonogram.size}</h1>
					<ScoreDisplay />
					<TimerDisplay />

				</div>

				<BoardControls />
				<SettingsButton />
			</div>
			<DisplayNonoBoard />
		</div>
	)

}

export default GamePage