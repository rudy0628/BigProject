import React, { useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import useUiStore from '../../store/uiStore';

const MessageBar = () => {
	const { messageBar, setMessageBar } = useUiStore();
	const { open, severity, text } = messageBar;

	const handleClose = useCallback(
		(event?: React.SyntheticEvent | Event, reason?: string) => {
			if (reason === 'clickaway') {
				return;
			}

			setMessageBar(false, 'success', '');
		},
		[setMessageBar]
	);

	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default MessageBar;
