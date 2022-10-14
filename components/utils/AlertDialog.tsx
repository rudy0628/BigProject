import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import useUiStore from '../../store/uiStore';

interface IProps {
	title: string;
	description: string;
	successHandler: any;
}

const AlertDialog = ({ title, description, successHandler }: IProps) => {
	const { alertDialogIsOpen, setAlertDialogIsOpen } = useUiStore();

	return (
		<Dialog
			open={alertDialogIsOpen}
			onClose={() => setAlertDialogIsOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{/* title */}
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			{/* content */}
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{description}
				</DialogContentText>
			</DialogContent>
			{/* action */}
			<DialogActions>
				<Button onClick={() => setAlertDialogIsOpen(false)}>取消</Button>
				<Button
					onClick={() => {
						successHandler();
						setAlertDialogIsOpen(false);
					}}
					autoFocus
				>
					確定
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
