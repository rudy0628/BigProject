import React, { useState, useEffect, useCallback } from 'react';
import {
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	Link,
	Rating,
	Box,
	IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';

import InfiniteScrollLoading from '../../utils/InfiniteScrollLoading';
import NoResults from '../../utils/NoResults';

import useShoppingCartStore from '../../../store/shoppingCartStore';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/router';

import { ShoppingItem } from '../../../type';

interface ShoppingItemsIProps {
	shoppingItems: ShoppingItem[];
}

interface ShoppingItemIProps {
	item: ShoppingItem;
}

const numberFormat = new Intl.NumberFormat();

const ShoppingItem = ({ item }: ShoppingItemIProps) => {
	const { addIntoCart } = useShoppingCartStore();
	const { setMessageBar } = useUiStore();
	const { userProfile }: any = useAuthStore();
	const router = useRouter();

	// comments average review
	let review = 0;
	if (item.comments) {
		for (const comment of item.comments) {
			review += comment.review;
		}
		review = review / item.comments.length;
	}

	const addToCartHandler = useCallback(async () => {
		setMessageBar(true, 'warning', '商品新增中...');
		try {
			await addIntoCart(item._id, 1, userProfile._id);
			setMessageBar(true, 'success', `商品${item.title}已新增到購物車!`);
		} catch (e: any) {
			setMessageBar(true, 'success', `商品${item.title}新增失敗!`);
			return;
		}
	}, [addIntoCart, item._id, item.title, setMessageBar, userProfile]);

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				{/* image */}
				<Image
					src={item.imageList[0].url}
					alt={item.title}
					width="100%"
					height="50"
					layout="responsive"
					objectFit="cover"
					loading="lazy"
					placeholder="blur"
					blurDataURL={item.imageList[0].url}
				/>
				{/* content */}
				<CardContent>
					<Link
						variant="h5"
						sx={{ textDecoration: 'none', cursor: 'pointer' }}
						onClick={() => router.push(`/shoppingsite/${item._id}`)}
					>
						{item.title}
					</Link>
					<Typography variant="body2" color="text.secondary" marginTop={1}>
						{item.description}
					</Typography>
					<Box display="flex" gap={1} marginTop={1}>
						<Rating name="read-only" value={review} readOnly />
						<Typography>{`(${
							item.comments?.length ? item.comments.length : 0
						})`}</Typography>
					</Box>
					<Box
						marginTop={3}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="h5"
							sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}
						>
							${numberFormat.format(+item.price)}
							<Typography>NTD</Typography>
						</Typography>
						{userProfile && (
							<IconButton
								color="primary"
								aria-label="add to shopping cart"
								onClick={addToCartHandler}
							>
								<AddShoppingCartIcon />
							</IconButton>
						)}
					</Box>
					<Typography variant="body2" color="text.secondary" marginTop={1}>
						最後更新日期：
						{new Date(item.date).toLocaleString('zh-TW', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

const ShoppingItems = ({ shoppingItems }: ShoppingItemsIProps) => {
	const router = useRouter();
	const { searchText, setSearchText } = useUiStore();
	const [infiniteItems, setInfiniteItems] = useState<ShoppingItem[]>([]);
	const [infiniteChunk, setInfiniteChunk] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(shoppingItems.length > 8);

	// if query is not exist, set the search text to empty
	useEffect(() => {
		if (!router.query || Object.keys(router.query).length === 0) {
			setSearchText('');
		}
	}, [router.query, setSearchText]);

	// Infinite scroll
	useEffect(() => {
		setInfiniteItems(shoppingItems.slice(0, 8));
	}, [shoppingItems]);

	// Infinite scroll
	const fetchMoreData = () => {
		if (infiniteChunk * 8 > shoppingItems.length) {
			setHasMore(false);
			return;
		}

		setTimeout(() => {
			setInfiniteItems(prevState =>
				prevState.concat(
					shoppingItems.slice(infiniteChunk * 8, (infiniteChunk + 1) * 8)
				)
			);
			setInfiniteChunk(prevState => prevState + 1);
		}, 2000);
	};

	return (
		<Container maxWidth="xl" sx={{ paddingY: 3 }}>
			{/* Search value */}
			{searchText.length !== 0 && (
				<Typography variant="h5" component="h1" marginBottom={2}>
					{searchText}
				</Typography>
			)}
			{/* Shopping item */}
			{infiniteItems.length > 0 && (
				<InfiniteScroll
					dataLength={infiniteItems.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={<InfiniteScrollLoading productType="Shoppingsite" />}
				>
					<Grid container spacing={3} sx={{ marginBottom: '1rem' }}>
						{infiniteItems.map((item: ShoppingItem, index: number) => (
							<ShoppingItem key={index} item={item} />
						))}
					</Grid>
				</InfiniteScroll>
			)}
			{/* No shopping item */}
			{shoppingItems.length === 0 && (
				<NoResults text="暫時沒有任何商品，趕快去新增吧!" />
			)}
		</Container>
	);
};

export default ShoppingItems;
