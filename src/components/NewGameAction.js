import React from 'react';
import useTimerContext from '../contexts/TimerContext';
import useGameContext from '../contexts/GameContext';

const NewGameAction = (size) => {
	const {startTimer} = useTimerContext()
	const {startNewGame} = useGameContext()
	startTimer()
	startNewGame(size)
};

export default NewGameAction;