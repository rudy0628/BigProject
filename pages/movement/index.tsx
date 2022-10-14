import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, IconButton, Container, Drawer } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import Head from 'next/head';

import MovementSideBar from '../../components/movement/MovementSideBar';
import Movement from '../../components/movement/Movement';
import MovementSearch from '../../components/movement/MovementSearch';
import NoResults from '../../components/utils/NoResults';
import InfiniteScrollLoading from '../../components/utils/InfiniteScrollLoading';

import useMovementStyles from '../../styles/movement';

import { Movement as IMovement } from '../../type';

interface IProps {
	movements: IMovement[];
}

const MovementPage = ({ movements }: IProps) => {
	const [infiniteItems, setInfiniteItems] = useState<IMovement[]>([]);
	const [infiniteChunk, setInfiniteChunk] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(movements.length > 6);

	const [filterMovements, setFilterMovements] = useState<IMovement[]>([]);
	const [movementType, setMovementType] = useState<string>('');
	const [isSort, setIsSort] = useState<boolean>(false);
	const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
	const classes = useMovementStyles();

	useEffect(() => {
		setInfiniteItems(movements.slice(0, 6));
	}, [movements]);

	useEffect(() => {
		if (movements.length > 0) {
			let filterMovements: IMovement[] = [];
			if (movementType === '') {
				filterMovements = movements;
			} else if (movementType === 'Shoppingsite') {
				filterMovements = movements.filter(
					movement => movement.product === 'Shoppingsite'
				);
			} else if (movementType === 'Airtshop') {
				filterMovements = movements.filter(
					movement => movement.product === 'Airtshop'
				);
			}

			// set the new infiniteItems
			setInfiniteItems(filterMovements.slice(0, 6));

			// reset infinite chunk and hasMore
			setHasMore(filterMovements.length > 6);
			setInfiniteChunk(1);

			// set the current filterMovements
			setFilterMovements(filterMovements);
		}
	}, [movementType, movements]);

	useEffect(() => {
		if (movements.length > 0) {
			let filterMovements: IMovement[] = [];

			if (isSort) {
				filterMovements = movements.sort((a, b) => {
					if (a.date < b.date) return -1;
					else if (a.date > b.date) return 1;
					return 0;
				});
			} else {
				filterMovements = movements.sort((a, b) => {
					if (a.date < b.date) return 1;
					else if (a.date > b.date) return -1;
					return 0;
				});
			}

			// set the new infiniteItems
			setInfiniteItems(filterMovements.slice(0, 6));

			// reset infinite chunk and hasMore
			setHasMore(filterMovements.length > 6);
			setInfiniteChunk(1);

			// set the current filterMovements
			setFilterMovements(filterMovements);
		}
	}, [isSort, movements]);

	// Infinite scroll
	const fetchMoreData = () => {
		if (infiniteChunk * 6 > filterMovements.length) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setInfiniteItems(prevState =>
				prevState.concat(
					filterMovements.slice(infiniteChunk * 6, (infiniteChunk + 1) * 6)
				)
			);
			setInfiniteChunk(prevState => prevState + 1);
		}, 2000);
	};

	return (
		<>
			<Head>
				<title>所有動態</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* open sidebar button */}
			<IconButton
				size="large"
				sx={{ position: 'fixed', top: '50%', left: 10 }}
				color="primary"
				onClick={() => setDrawerIsOpen(true)}
			>
				<StartIcon />
			</IconButton>
			<Container maxWidth="md" sx={{ paddingY: '1rem' }}>
				{/* movement sidebar */}
				<Drawer
					open={drawerIsOpen}
					onClose={() => setDrawerIsOpen(false)}
					sx={{ overflowY: 'auto' }}
				>
					<MovementSideBar
						movementType={movementType}
						setMovementType={setMovementType}
						isSort={isSort}
						setIsSort={setIsSort}
						setDrawerIsOpen={setDrawerIsOpen}
					/>
				</Drawer>
				{/* movement search */}
				<MovementSearch />
				{/* movements */}
				{infiniteItems.length === 0 && <NoResults text="沒有任何動態!" />}
				{infiniteItems.length > 0 && (
					<InfiniteScroll
						dataLength={infiniteItems.length}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={<InfiniteScrollLoading productType="Movement" />}
					>
						<Box className={classes.movementsBox}>
							{infiniteItems.map((movement: IMovement) => (
								<Movement key={movement._id} movement={movement} />
							))}
						</Box>
					</InfiniteScroll>
				)}
			</Container>
		</>
	);
};

export const getServerSideProps = async () => {
	let response;
	try {
		response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/movement`
		);
	} catch (e) {
		return {
			props: {
				movements: [],
			},
		};
	}

	return {
		props: {
			movements: response.data,
		},
	};
};

export default MovementPage;
