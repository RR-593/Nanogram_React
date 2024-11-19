import { Link } from 'react-router-dom';
import './HomeButtons.css'

function SelectBoardButton() {

	return (
		<Link to="/SelectBoard">
			<button className="HomeButton" id="new">New Board</button>
		</Link>
	);
}

export default SelectBoardButton;