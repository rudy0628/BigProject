import React from 'react';
import {
	Accordion,
	AccordionSummary,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import useAuthStore from '../../../store/authStore';
import useUiStore from '../../../store/uiStore';
import useMainNavStyles from '../../../styles/main/mainNav';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

interface IProps {
	handleProfileListClose?: () => void;
	anchorEl?: null | HTMLElement;
	setDrawerIsOpen?: (isOpen: boolean) => void;
	isSide: boolean;
}

const ProfileList = ({
	handleProfileListClose,
	anchorEl,
	setDrawerIsOpen,
	isSide,
}: IProps) => {
	const { removeUser, userProfile }: any = useAuthStore();
	const { setMessageBar } = useUiStore();
	const classes = useMainNavStyles();

	const profileListData = [
		{
			text: '登出',
			icon: LogoutIcon,
			clickHandler: () => {
				// profile list close
				if (handleProfileListClose) handleProfileListClose();
				if (setDrawerIsOpen) setDrawerIsOpen(false);

				// remove user from useAuthStore
				removeUser();

				// google logout
				googleLogout();

				// clear local storage
				localStorage.removeItem('token');

				// message bar
				setMessageBar(true, 'success', `下次再見，${userProfile.userName}`);
			},
		},
	];

	if (isSide) {
		return (
			<ListItem>
				<Accordion sx={{ width: '100%' }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>{userProfile.userName}</Typography>
					</AccordionSummary>
					{profileListData.map((listItem, i) => (
						<ListItemButton
							key={i}
							sx={{ margin: 1 }}
							onClick={listItem.clickHandler}
						>
							<ListItemIcon>
								<listItem.icon className={classes.navIcon} />
							</ListItemIcon>
							<ListItemText primary={listItem.text} />
						</ListItemButton>
					))}
				</Accordion>
			</ListItem>
		);
	} else {
		return (
			<Menu
				sx={{ mt: '45px', borderRadius: 1 }}
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleProfileListClose}
			>
				{profileListData.map((listItem, i) => (
					<MenuItem
						key={i}
						onClick={listItem.clickHandler}
						sx={{ display: 'flex', gap: 2, padding: 2, width: '200px' }}
					>
						<listItem.icon color="primary" />
						{listItem.text}
					</MenuItem>
				))}
			</Menu>
		);
	}
};

export default ProfileList;
