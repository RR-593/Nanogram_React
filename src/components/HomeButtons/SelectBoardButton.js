import { Link } from 'react-router-dom';
import './HomeButtons.css'
import useGameContext from '../../contexts/GameContext';

function SelectBoardButton() {

	const {
		nonogram,
		startNewGame
	} = useGameContext();

	const newGameAction = () => {
    startNewGame(nonogram.size)
  }

	return (
		<div className="new-board-button-container">
			<Link to="/SelectBoard">
				<button className="HomeButton select-from-menu" id="new">Select Board</button>
			</Link>
			<Link to="/Game">
				<button className="HomeButton quick-select" onClick={newGameAction} id="new">{nonogram.size}</button>
			</Link>
		</div>
	);
}

export default SelectBoardButton;