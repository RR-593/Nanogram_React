import React, { createContext, useState, useContext, useEffect } from 'react';
import useGameContext from './GameContext';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

	const [time, setTime] = useState(0); // Store time in milliseconds
	const [isActive, setIsActive] = useState(false); // Track whether the timer is active

	const {
		gameState //'pause', 'playing', 'won'
	} = useGameContext();

	useEffect(() => {
		console.log(gameState);
		// Declare the interval variable so it can be cleared when necessary.
		let interval;

		// If the timer is active, not paused, and the game has not been won...
		if (isActive && gameState === 'playing') {
			// Start an interval that updates the time every 10 milliseconds.
			// interval = setInterval(() => {
				// setTime((prevTime) => prevTime + 10); // Increment the time by 10 milliseconds.
			// }, 10); // Update the timer every 10ms (0.01 second).
		} else if (gameState === 'won' || gameState === 'pause') {
			// If the game is won or the timer is paused, clear the interval.
			clearInterval(interval);
		}

		// Cleanup function to clear the interval if the component is unmounted or the conditions change.
		// return () => clearInterval(interval);
	}, [isActive, gameState]);

	const startTimer = () => setIsActive(true);
	const stopTimer = () => setIsActive(false);
	const resetTimer = () => {
		setTime(0);
		setIsActive(false);
	};

	return (
		<TimerContext.Provider value={{
			time,
			startTimer,
			stopTimer,
			resetTimer,
		}}>
			{children}
		</TimerContext.Provider>);
}

const useTimerContext = () => useContext(TimerContext);

export default useTimerContext;