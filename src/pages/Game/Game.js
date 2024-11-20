import { useEffect, useState, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import useGameContext from '../../contexts/GameContext'
import DisplayNonoBoard from '../../components/NonoBoard/DisplayNonoBoard'
import './Game.css'
import BoardControls from '../../components/BoardControls/BoardControls'
import SettingsButton from '../../components/HomeButtons/SettingsButton'
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay'
import useTimer from '../../contexts/TimerContext';
import Timer from '../../components/TimerDisplay/TimerDisplay.js';


const GamePage = () => {
	var location = useLocation()

	const {
		nonogram,
		gameState
	} = useGameContext();


	return (
		<div className="GameInterface">
			<div className="SidePannel">
				<div style={{ width: "100%" }}>
					<h1 style={{ marginTop: 0 }}>{nonogram.size}x{nonogram.size}</h1>
					<ScoreDisplay />
					<Timer/>
				</div>
				<BoardControls />
				<SettingsButton />
			</div>
			<DisplayNonoBoard />
		</div>
	)

}

export default GamePage