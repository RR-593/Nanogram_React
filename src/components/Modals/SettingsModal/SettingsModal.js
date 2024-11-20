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

function SettingsModal() {
	const location = useLocation();
	const {
		gameState,
		setGameState,
		score,
		setScore,
		globalSettings,
		nonogram,
		currentBoard,
		setCurrentBoard,
		startNewGame,
		clearBoard
	} = useGameContext();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setGameState('pause')
		setOpen(true)
	};
	const handleClose = () => {
		console.log(location.pathname);
		if(location.pathname === "/Game") setGameState('playing')
		setOpen(false)
	};

	// console.log(location.pathname);

	return (
		<Box>
			<button className="HomeButton" id="settings" onClick={handleOpen}>Settings</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<Link to="/">
						<Button>Back to main</Button>
					</Link>
				</Box>
			</Modal>
		</Box>
	);
}

export default SettingsModal;