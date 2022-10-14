import React from 'react';
import axios from 'axios';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import Head from 'next/head';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import MovementSearch from '../../components/movement/MovementSearch';
import NoResults from '../../components/utils/NoResults';

import { useRouter } from 'next/router';
import useMovementStyles from '../../styles/movement';

import { User } from '../../type';

interface IProps {
	users: User[];
}

const MovementUsers = ({ users }: IProps) => {
	const classes = useMovementStyles();
	const router = useRouter();

	if (users.length === 0 || !users) {
		return (
			<Container
				maxWidth="sm"
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}
			>
				<MovementSearch />
				<NoResults text="找不到任何使用者，請重新搜尋" />
			</Container>
		);
	}

	return (
		<>
			<Head>
				<title>動態 - 搜尋使用者結果</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container
				maxWidth="sm"
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}
			>
				<Button
					sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
					onClick={() => router.push('/movement')}
				>
					<ArrowBackIcon /> 返回所有動態
				</Button>
				<MovementSearch />
				{users.map(user => (
					<Box
						key={user._id}
						className={classes.movementUserBox}
						onClick={() => router.push(`/movement/${user.userName}`)}
					>
						<Avatar
							alt={user.userName}
							src={user.image}
							sx={{ width: '56px', height: '56px' }}
						/>
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
			</Container>
		</>
	);
};

export const getServerSideProps = async ({
	query: { q },
}: {
	query: { q: string };
}) => {
	if (q) {
		const encodeUser = encodeURIComponent(q);
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/${encodeUser}`
			);

			return {
				props: {
					users: response.data,
				},
			};
		} catch (e) {
			return {
				props: {
					users: [],
				},
			};
		}
	} else {
		return {
			props: {
				users: [],
			},
		};
	}
};

export default MovementUsers;
