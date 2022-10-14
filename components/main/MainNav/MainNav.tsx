import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Container,
	Typography,
	Toolbar,
} from '@mui/material';
import Sidebar from './Sidebar';
import ProfileList from './ProfileList';
import DayNightSwitch from '../../utils/DayNightSwitch';

import { useRouter } from 'next/router';
import useMainNavStyles from '../../../styles/main/mainNav';
import useAuthStore from '../../../store/authStore';

import DehazeIcon from '@mui/icons-material/Dehaze';

interface IProps {
	navbarList: {
		text: string;
		url: string;
		icon: any;
		auth: boolean;
	}[];
}

const MainNav = ({ navbarList }: IProps) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const classes = useMainNavStyles();
	const { userProfile }: any = useAuthStore();
	const router = useRouter();

	const handleProfileListClose = () => {
		setAnchorEl(null);
	};

	const handleProfileList = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<Box paddingY={1}>
				<Container maxWidth="xl" className={classes.container}>
					{/* LOGO */}
					<Typography
						variant="h5"
						onClick={() => {
							router.push('/');
						}}
						sx={{ cursor: 'pointer' }}
					>
						BigProject
					</Typography>
					{/* Link navbar */}
					<Toolbar disableGutters className={classes.toolbar}>
						{navbarList
							.filter(nav => {
								if (nav.auth) {
									if (!userProfile) {
										return false;
									} else {
										return true;
									}
								} else {
									return true;
								}
							})
							.map((nav, i) => (
								<Button
									size="large"
									key={i}
									color="inherit"
									onClick={() => router.push(nav.url)}
								>
									{nav.text}
								</Button>
							))}
						{!userProfile && (
							<Button
								variant="contained"
								size="large"
								onClick={() => router.push('/login')}
							>
								馬上開始
							</Button>
						)}
						{/* User Profile & Profile List */}
						{userProfile && (
							<Box sx={{ position: 'relative' }}>
								<Avatar
									alt="Remy Sharp"
									src={userProfile.image}
									sx={{ cursor: 'pointer' }}
									onClick={handleProfileList}
								/>
								<ProfileList
									handleProfileListClose={handleProfileListClose}
									anchorEl={anchorEl}
									isSide={false}
								/>
							</Box>
						)}
						{/* Day night theme switch */}
						<DayNightSwitch />
					</Toolbar>
					{/* Menu button */}
					<Button
						variant="outlined"
						onClick={() => setDrawerIsOpen(true)}
						className={classes.menuBtn}
					>
						<DehazeIcon />
					</Button>
				</Container>
			</Box>
			{/* Sidebar */}
			<Sidebar
				drawerIsOpen={drawerIsOpen}
				setDrawerIsOpen={setDrawerIsOpen}
				navbarList={navbarList}
			/>
		</>
	);
};

export default MainNav;
