import { Link } from 'react-router-dom';
import './HomeButtons.css'

function TrophieButton() {

	return (
		<Link to="Trophies">
			<button className="HomeButton" id="trophie">Trophies</button>
		</Link>
	);
}

export default TrophieButton;