import { useEffect, useState, useContext } from 'react'
import useGameContext from '../../contexts/GameContext'
import DisplayNonoBoard from '../../components/NonoBoard/DisplayNonoBoard'
import './Game.css'
import BoardControls from '../../components/BoardControls/BoardControls'
import SettingsButton from '../../components/HomeButtons/SettingsButton'

const GamePage = () => {

	return (
		<div className="GameInterface">
			<div className="SidePannel">
				<h2>Nonograms</h2>
				<div>Score</div>
				<div>Timer</div>
				<BoardControls/>
				<SettingsButton/>
			</div>
			<DisplayNonoBoard/>
		</div>
	)

}

export default GamePage