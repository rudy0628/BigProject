import React, { useEffect, useCallback } from 'react';
import { Avatar, Box, Button, Divider, Typography, Link } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useRouter } from 'next/router';
import useMovementStyles from '../../styles/movement';
import useAuthStore from '../../store/authStore';

import {
	movementSideBarLink1,
	movementSideBarLink2,
	movementSideBarLink3,
} from '../../utility/data/movementData';

interface IProps {
	movementType: string;
	setMovementType: React.Dispatch<React.SetStateAction<string>>;
	isSort: boolean;
	setIsSort: React.Dispatch<React.SetStateAction<boolean>>;
	setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovementSideBar = ({
	movementType,
	setMovementType,
	isSort,
	setIsSort,
	setDrawerIsOpen,
}: IProps) => {
	const classes = useMovementStyles();
	const { getAllUsers, allUsers } = useAuthStore();
	const router = useRouter();
	const year = new Date().getFullYear();

	const typeFilterHandler = useCallback(
		(type: string) => {
			if (movementType === type) {
				setMovementType('');
			} else {
				setMovementType(type);
			}
			setDrawerIsOpen(false);
		},
		[movementType, setDrawerIsOpen, setMovementType]
	);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);

	return (
		<Box
			className={classes.movementSideBox}
			sx={{ padding: '1rem' }}
			width="330px"
		>
			{/* Type */}
			<Box className={classes.movementSideBox}>
				<Typography variant="h6">動態類型</Typography>
				<Box className={classes.movementButtonBox}>
					<Button
						variant={movementType === 'Shoppingsite' ? 'contained' : 'outlined'}
						onClick={() => typeFilterHandler('Shoppingsite')}
					>
						Shoppingsite
					</Button>
					<Button
						variant={movementType === 'Airtshop' ? 'contained' : 'outlined'}
						onClick={() => typeFilterHandler('Airtshop')}
					>
						Airtshop
					</Button>
				</Box>
			</Box>
			<Divider />
			{/* date */}
			<Box className={classes.movementSideBox}>
				<Typography variant="h6">排序</Typography>
				<Button
					variant="outlined"
					onClick={() =>
						setIsSort(prevState => {
							setDrawerIsOpen(false);
							return !prevState;
						})
					}
				>
					時間：{isSort ? '最遠' : '最近'}
				</Button>
			</Box>
			<Divider />
			{/* user account */}
			<Box className={classes.movementSideBox}>
				<Typography variant="h6">建議帳號</Typography>
				<Box>
					{/* user box */}
					{allUsers.slice(0, 6).map((user: any) => (
						<Box
							key={user._id}
							className={classes.movementUserBox}
							onClick={() => {
								setDrawerIsOpen(false);
								router.push(`/movement/${user.userName}`);
							}}
						>
							<Avatar alt={user.userName} src={user.image} />
							<Box>
								<Typography
									sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
								>
									{user.userName} <VerifiedIcon color="primary" />
								</Typography>
								<Typography color="#777">{user.userName}</Typography>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
			<Divider />
			{/* links */}
			<Box display="flex" gap={1} flexWrap="wrap">
				{movementSideBarLink1.map((link, i) => (
					<Link key={i} className={classes.movementSideLink}>
						{link}
					</Link>
				))}
			</Box>
			<Box display="flex" gap={1} flexWrap="wrap">
				{movementSideBarLink2.map((link, i) => (
					<Link key={i} className={classes.movementSideLink}>
						{link}
					</Link>
				))}
			</Box>
			<Box display="flex" gap={1} flexWrap="wrap">
				{movementSideBarLink3.map((link, i) => (
					<Link key={i} className={classes.movementSideLink}>
						{link}
					</Link>
				))}
			</Box>
			{/* footer */}
			<Typography color="#777">© {year} BigProject</Typography>
		</Box>
	);
};

export default MovementSideBar;
