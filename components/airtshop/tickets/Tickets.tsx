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
				<Button onClick={() => setStep(1)}>返回搜尋</Button>
			)}
			{tickets.length !== 0 && (
				<Box className={classes.subHeaderBox}>
					<Typography>總共找到 {tickets.length} 張機票</Typography>
					<Button onClick={() => setIsDesc(prevState => !prevState)}>
						價格：{isDesc ? '高 ⇀ 低' : '低 ⇀ 高'}
					</Button>
				</Box>
			)}
			{(tickets.length === 0 || !tickets) && (
				<NoResults text="暫時沒有任何航班，請稍後再試！" />
			)}
			{(tickets.length === 0 || !tickets) && (
				<Button variant="contained" onClick={() => setStep(1)}>
					返回搜尋
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
