import { Link } from 'react-router-dom';
import './HomeButtons.css'
import useGameContext from '../../contexts/GameContext';
import useTimerContext from '../../contexts/TimerContext';
import NewGameAction from '../NewGameAction';

function SelectBoardButton() {
	const {startTimer} = useTimerContext()

	const {
		nonogram,
		startNewGame
	} = useGameContext();

	return (
		<div className="new-board-button-container">
			<Link to="/SelectBoard">
				<button className="HomeButton select-from-menu" id="new">Select Board</button>
			</Link>
			<Link to="/Game">
				<button className="HomeButton quick-select" onClick={NewGameAction(nonogram.size)} id="new">{nonogram.size}</button>
			</Link>
		</div>
	);
}

export default SelectBoardButton;