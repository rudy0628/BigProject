import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface IProps {
	open: boolean;
	handleClose: () => void;
	aircraftDetail: {
		aircraftId: string;
		from: string;
		to: string;
		speed: number;
	};
}

const AircraftModal = ({ open, handleClose, aircraftDetail }: IProps) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{aircraftDetail.aircraftId || '未知'}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 1 }}>
					{aircraftDetail.from || '未知'} 到 {aircraftDetail.to || '未知'}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 1 }}>
					速度：{aircraftDetail.speed || '未知'} km/h
				</Typography>
			</Box>
		</Modal>
	);
};

export default AircraftModal;
