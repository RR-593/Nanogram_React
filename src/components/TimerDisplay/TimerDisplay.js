import React from 'react';
import useTimer from '../../contexts/TimerContext'; // Import the useTimer hook from context

function Timer() {
	const { time, isActive, toggleTimer } = useTimer(); // Destructure the state and functions from context

	// Function to format time as hh:mm:ss
	const formatTime = (milliseconds) => {
		const mins = Math.floor((milliseconds / 6000) % 60);
		const secs = Math.floor((milliseconds / 100) % 60);
		const milli = milliseconds % 100;
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(milli).padStart(2, '0')}`;
	};

	return (
		<div>
			<p>{formatTime(time)}</p>
			<button onClick={toggleTimer}>{isActive ? 'Pause' : 'Resume'}</button>
		</div>
	);
}

export default Timer;
