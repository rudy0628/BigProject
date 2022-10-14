import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	Avatar,
	Box,
	Button,
	Container,
	Typography,
	Tab,
	Tabs,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from 'next/head';
import { Movement as IMovement } from '../../type';

import Movement from '../../components/movement/Movement';
import NoResults from '../../components/utils/NoResults';
import Chart from '../../components/utils/Chart';
import InfiniteScrollLoading from '../../components/utils/InfiniteScrollLoading';

import { useRouter } from 'next/router';
import useMovementStyles from '../../styles/movement/index';

interface IProps {
	user: string;
	userMovements: IMovement[];
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const MovementUserPage = ({ user, userMovements }: IProps) => {
	const [infiniteItems, setInfiniteItems] = useState<IMovement[]>([]);
	const [infiniteChunk, setInfiniteChunk] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(userMovements.length > 6);

	const [value, setValue] = useState<number>(0);
	const router = useRouter();
	const classes = useMovementStyles();

	// Infinite scroll
	useEffect(() => {
		if (userMovements.length > 0 || userMovements) {
			setInfiniteItems(userMovements.slice(0, 6));
		}
	}, [userMovements]);

	// Infinite scroll
	const fetchMoreData = () => {
		if (infiniteChunk * 6 > userMovements.length) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setInfiniteItems(prevState =>
				prevState.concat(
					userMovements.slice(infiniteChunk * 6, (infiniteChunk + 1) * 6)
				)
			);
			setInfiniteChunk(prevState => prevState + 1);
		}, 2000);
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if (userMovements.length === 0 || !userMovements) {
		return (
			<Container maxWidth="md" sx={{ paddingY: 4 }}>
				<NoResults text={`找不到 ${user} 或 ${user} 沒有任何動態。`} />
				{/* Back button */}
				<Button
					sx={{
						marginTop: 2,
						display: 'flex',
						gap: 1,
						alignItems: 'center',
					}}
					onClick={() => router.push('/movement')}
				>
					<ArrowBackIcon />
					返回
				</Button>
			</Container>
		);
	}

	const { image, userName } = userMovements[0].user;

	return (
		<>
			<Head>
				<title>動態 - {userName}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="md" sx={{ paddingY: 4 }}>
				{/* Back button */}
				<Button
					sx={{
						marginBottom: 2,
						display: 'flex',
						gap: 1,
						alignItems: 'center',
					}}
					onClick={() => router.push('/movement')}
				>
					<ArrowBackIcon />
					返回
				</Button>
				{/* user title */}
				<Box className={classes.movementTitleBox}>
					<Avatar
						alt={userName}
						src={image}
						sx={{ width: '56px', height: '56px' }}
					/>
					<Box>
						<Typography
							sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
						>
							{userName} <VerifiedIcon color="primary" />
						</Typography>
						<Typography color="#777">{userName}</Typography>
					</Box>
				</Box>
				{/* Tab */}
				<Box sx={{ borderBottom: 1, borderColor: 'divider', marginY: 2 }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="動態" {...a11yProps(0)} />
						<Tab label="Shoppingsite" {...a11yProps(1)} />
						<Tab label="Airtshop" {...a11yProps(2)} />
					</Tabs>
				</Box>
				{/* Tab 沒有動態 */}
				{value === 0 && infiniteItems.length === 0 && (
					<NoResults text="暫時沒有任何動態!" />
				)}
				{/* Tab 動態 */}
				{value === 0 && infiniteItems.length > 0 && (
					<InfiniteScroll
						dataLength={infiniteItems.length}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={<InfiniteScrollLoading productType="Movement" />}
					>
						<Box>
							{infiniteItems.map(movement => (
								<Movement key={movement._id} movement={movement} />
							))}
						</Box>
					</InfiniteScroll>
				)}
				{/* Shoppingsite chart */}
				{value === 1 && (
					<Chart
						movements={userMovements.filter(
							movement => movement.product === 'Shoppingsite'
						)}
						type="Shoppingsite"
					/>
				)}
				{/* Airtshop Chart */}
				{value === 2 && (
					<Chart
						movements={userMovements.filter(
							movement => movement.product === 'Airtshop'
						)}
						type="Airtshop"
					/>
				)}
			</Container>
		</>
	);
};

export const getServerSideProps = async ({
	params: { searchUser },
}: {
	params: { searchUser: string };
}) => {
	let response;
	const encodeSearchUser = encodeURIComponent(searchUser);
	try {
		response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/movement/${encodeSearchUser}`
		);
	} catch (e) {
		return {
			props: {
				user: searchUser,
				userMovements: [],
			},
		};
	}

	return {
		props: {
			user: searchUser,
			userMovements: response.data,
		},
	};
};

export default MovementUserPage;
