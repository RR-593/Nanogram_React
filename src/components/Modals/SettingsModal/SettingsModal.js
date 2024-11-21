/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


// import useGameContext from '../../../contexts/GameContext'
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
	var location = useLocation()
	const [open, setOpen] = useState(false);

	const [controlButtons, setControlButtons] = useState(<></>);


	// console.log(location.pathname);

	const controlButtonsObj = (
		<Box className="button-box">
			<Link to="/">
				<Button>Back to main</Button>
			</Link>
			<Button></Button>
		</Box>
	)


	const handleOpen = () => {
		if (location.pathname === "/Game") setControlButtons(controlButtonsObj)
		else setControlButtons(<></>)
		setOpen(true);
	}
	const handleClose = () => setOpen(false);



	return (
		<Box>
			<button className="HomeButton" id="settings" onClick={handleOpen}>Settings</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-settings"
			>
				<Box sx={modalStyle}>
					<Box className="modal-header">
						<Typography id="modal-modal-settings" variant="h6" component="h2">
							Settings
						</Typography>
						{/* <button>delete data</button> */}
					</Box>
					{controlButtons}
				</Box>
			</Modal>
		</Box>
	);
}

export default SettingsModal;