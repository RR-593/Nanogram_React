import React from 'react';
import useTimer from '../../contexts/TimerContext'; 
import useGameContext from '../../contexts/GameContext';
import './TimerDisplay.css'

function TimerDisplay() {
	const { time, isActive } = useTimer(); 
	const {gameState} = useGameContext()


	// Function to format time as hh:mm:ss
	const formatTime = (milliseconds) => {
		const mins = Math.floor((milliseconds / 6000) % 60);
		const secs = Math.floor((milliseconds / 100) % 60);
		const milli = milliseconds % 100;
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(milli).padStart(2, '0')}`;
	};

	const display = (
		<div className='timer-box'>
			<span>{formatTime(time)}</span>
		</div>
	)



	return display;
}

export default TimerDisplay;
