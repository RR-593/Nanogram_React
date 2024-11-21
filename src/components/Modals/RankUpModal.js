import React, { useState, useEffect } from 'react';

// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';


import useGameContext from '../../contexts/GameContext'
// import { Link, useLocation } from 'react-router-dom';


function RankUpModal() {
	const {
		rating,
		setRank,
		globalSettings,
		boardsUnlocked,
		setBoardsUnlocked
	} = useGameContext();

	// const [open, setOpen] = useState(false);


	useEffect(() => {
		var newRank = globalSettings.stages[0]
		for(let stage of globalSettings.stages){
			if(stage.rankReq <= rating) newRank = stage
		}

		var newUnlockedBoards = [...new Set([...boardsUnlocked, ...newRank.newBoards])].sort((a, b) => a - b)
		setBoardsUnlocked(newUnlockedBoards)
		setRank(newRank)
	}, [rating]);

	return (
		<Box>
		</Box>
	);
}

export default RankUpModal;