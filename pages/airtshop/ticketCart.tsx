import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import { Button, Container } from '@mui/material';

import TicketCartItem from '../../components/airtshop/ticketCart/TicketCartItem';
import FullPageLoading from '../../components/utils/FullPageLoading';
import NoResults from '../../components/utils/NoResults';
import InfiniteScrollLoading from '../../components/utils/InfiniteScrollLoading';

import { TicketCartItem as ITicketCartItem } from '../../type';

import { useRouter } from 'next/router';
import useUiStore from '../../store/uiStore';
import useAuthStore from '../../store/authStore';

const TicketCart = () => {
	const [ticketCartItems, setTicketCartItems] = useState([]);
	const [infiniteItems, setInfiniteItems] = useState([]);
	const [infiniteChunk, setInfiniteChunk] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const { setIsLoading, isLoading, setMessageBar } = useUiStore();
	const { userProfile }: any = useAuthStore();
	const router = useRouter();
	const token = localStorage.getItem('token');

	if (!userProfile) {
		router.push('/login');
	}

	// fetch ticket cart
	useEffect(() => {
		const fetchCartData = async () => {
			setIsLoading(true);

			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/airtshop/ticketCart?userId=${userProfile?._id}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const { ticketCartItems } = response.data;
				setTicketCartItems(ticketCartItems);

				// infinite scroll
				setInfiniteItems(ticketCartItems.slice(0, 4));
				setHasMore(ticketCartItems.length > 4);

				setIsLoading(false);
			} catch (e) {
				setIsLoading(false);
				setMessageBar(true, 'error', '獲取已訂購機票失敗，請再試一次!');
				return;
			}
		};

		fetchCartData();
	}, [setIsLoading, setMessageBar, token, userProfile]);

	// Infinite scroll
	const fetchMoreData = () => {
		if (infiniteChunk * 4 > ticketCartItems.length) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setInfiniteItems(prevState =>
				prevState.concat(
					ticketCartItems.slice(infiniteChunk * 4, (infiniteChunk + 1) * 4)
				)
			);
			setInfiniteChunk(prevState => prevState + 1);
		}, 2000);
	};

	return (
		<>
			<Head>
				<title>Airtshop - 已訂購機票</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container
				maxWidth="sm"
				sx={{ paddingY: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				{!isLoading && (!ticketCartItems || ticketCartItems.length === 0) && (
					<NoResults text="尚未訂購任何機票，趕緊去訂購吧" />
				)}
				{!isLoading && (!ticketCartItems || ticketCartItems.length === 0) && (
					<Button
						variant="contained"
						onClick={() => router.push('/airtshop')}
						fullWidth
					>
						前往訂購
					</Button>
				)}
				<InfiniteScroll
					dataLength={infiniteItems.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={<InfiniteScrollLoading productType="Airtshop" />}
				>
					{infiniteItems.map((ticketCartItem: ITicketCartItem) => (
						<TicketCartItem
							key={ticketCartItem._key}
							ticketCartItem={ticketCartItem}
						/>
					))}
				</InfiniteScroll>
			</Container>
			<FullPageLoading open={isLoading} />
		</>
	);
};

export default TicketCart;
