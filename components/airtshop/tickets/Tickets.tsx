import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Box, Container, Card, Typography } from '@mui/material';

import InfiniteScrollLoading from '../../utils/InfiniteScrollLoading';
import Ticket from './Ticket';
import NoResults from '../../utils/NoResults';

import useAirtshopStyles from '../../../styles/airtshop';

import { AirtshopTicket } from '../../../type';

interface IProps {
	tickets: AirtshopTicket[];
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Tickets = ({ tickets, step, setStep }: IProps) => {
	const [infiniteItems, setInfiniteItems] = useState<AirtshopTicket[]>([]);
	const [infiniteChunk, setInfiniteChunk] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(tickets.length > 4);
	const [isDesc, setIsDesc] = useState(false);
	const classes = useAirtshopStyles();

	// Infinite scroll
	useEffect(() => {
		setInfiniteItems(tickets.slice(0, 4));
	}, [tickets]);

	// Infinite scroll
	useEffect(() => {
		if (infiniteItems.length > 0) {
			let updateItems: AirtshopTicket[] = [];
			if (isDesc) {
				updateItems = infiniteItems.sort((a, b) => b.duration - a.duration);
			} else {
				updateItems = infiniteItems.sort((a, b) => a.duration - b.duration);
			}

			setInfiniteItems(updateItems);
		}
	}, [infiniteItems, isDesc]);

	// Infinite scroll
	const fetchMoreData = () => {
		if (infiniteChunk * 4 >= tickets.length) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setInfiniteItems(prevState =>
				prevState.concat(
					tickets.slice(infiniteChunk * 4, (infiniteChunk + 1) * 4)
				)
			);
			setInfiniteChunk(prevState => prevState + 1);
		}, 2000);
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				paddingBottom: 4,
				paddingTop: 18,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			{tickets.length !== 0 && (
				<Button onClick={() => setStep(1)}>θΏεζε°</Button>
			)}
			{tickets.length !== 0 && (
				<Box className={classes.subHeaderBox}>
					<Typography>ηΈ½ε±ζΎε° {tickets.length} εΌ΅ζ©η₯¨</Typography>
					<Button onClick={() => setIsDesc(prevState => !prevState)}>
						εΉζ ΌοΌ{isDesc ? 'ι« β δ½' : 'δ½ β ι«'}
					</Button>
				</Box>
			)}
			{(tickets.length === 0 || !tickets) && (
				<NoResults text="ζ«ζζ²ζδ»»δ½θͺη­οΌθ«η¨εΎεθ©¦οΌ" />
			)}
			{(tickets.length === 0 || !tickets) && (
				<Button variant="contained" onClick={() => setStep(1)}>
					θΏεζε°
				</Button>
			)}
			{infiniteItems.length > 0 && (
				<InfiniteScroll
					dataLength={infiniteItems.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={<InfiniteScrollLoading productType="Airtshop" />}
				>
					{infiniteItems.map((ticket, i) => (
						<Card key={i} sx={{ marginBottom: '1rem' }}>
							<Ticket ticket={ticket} step={step} setStep={setStep} />
						</Card>
					))}
				</InfiniteScroll>
			)}
		</Container>
	);
};

export default Tickets;
