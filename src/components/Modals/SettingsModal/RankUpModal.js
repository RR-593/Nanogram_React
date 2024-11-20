import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import useGameContext from '../../../contexts/GameContext'
import { Link, useLocation } from 'react-router-dom';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'rgb(16, 19, 25)',
	border: '6px solid #575961',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
}

function RankUpModal() {
	const location = useLocation();
	const {
		gameState,
		setGameState,
		rating,
		setRating,
		rank,
		globalSettings,
		nonogram,
		currentBoard,
		setCurrentBoard,
		startNewGame,
		boardsUnlocked,
		setBoardsUnlocked
	} = useGameContext();

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		var newRank = globalSettings.stages[0]
		for(let stage of globalSettings.stages){
			if(stage.rankReq <= rating) newRank = stage
		}

		console.log(newRank);
		var newUnlockedBoards = [...new Set([...boardsUnlocked, ...newRank.newBoards])].sort((a, b) => a - b)
		console.log(newUnlockedBoards);
		setBoardsUnlocked(newUnlockedBoards)
	}, [rating]);

	return (
		<Box>
		</Box>
	);
}

export default RankUpModal;