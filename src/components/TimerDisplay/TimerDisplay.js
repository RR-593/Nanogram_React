import React from 'react';
import useTimerContext from '../../contexts/TimerContext';

const TimerDisplay = () => {
	const {time} = useTimerContext()
	console.log(time);
	return (
		<div>
			<span></span>
		</div>
	);
};

export default TimerDisplay;