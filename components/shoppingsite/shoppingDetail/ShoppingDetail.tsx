import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from 'react-material-ui-carousel';
import AlertDialog from '../../utils/AlertDialog';

import Image from 'next/image';

import useShoppingCartStore from '../../../store/shoppingCartStore';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import useShoppingDetailStyles from '../../../styles/shoppingsite/shoppingDetail';
import { useRouter } from 'next/router';

import { ShoppingDetail as IShoppingDetail } from '../../../type';
import axios from 'axios';

interface IProps {
	shoppingDetail: IShoppingDetail;
}

const ShoppingDetail = ({ shoppingDetail }: IProps) => {
	const [amount, setAmount] = useState(1);
	const { addIntoCart } = useShoppingCartStore();
	const { setMessageBar, setIsLoading, isLoading, setAlertDialogIsOpen } =
		useUiStore();
	const { userProfile }: any = useAuthStore();
	const classes = useShoppingDetailStyles();
	const router = useRouter();
	const token = localStorage.getItem('token');

	const { _id, title, date } = shoppingDetail;

	const addToCartHandler = useCallback(async () => {
		setMessageBar(true, 'warning', '商品新增中...');
		try {
			await addIntoCart(_id, amount, userProfile._id);
			setMessageBar(
				true,
				'success',
				`商品${shoppingDetail.title}已新增到購物車!`
			);
			setAmount(1);
		} catch (e: any) {
			setMessageBar(true, 'error', `商品${shoppingDetail.title}新增失敗!`);
			return;
		}
	}, [
		_id,
		addIntoCart,
		amount,
		setMessageBar,
		shoppingDetail.title,
		userProfile,
	]);

	const deleteItemHandler = useCallback(async () => {
		try {
			setIsLoading(true);
			await axios.delete(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingItem/${_id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setMessageBar(true, 'success', `商品${title}刪除成功!`);
			router.push('/shoppingsite');
		} catch (e: any) {
			setMessageBar(true, 'error', `商品${title}刪除失敗，請重新再試!`);
		}
		setIsLoading(false);
	}, [_id, router, setIsLoading, setMessageBar, title, token]);

	return (
		<Box
			marginY={2}
			border={1}
			borderColor="#aaa"
			borderRadius={1}
			overflow="hidden"
		>
			<Box className={classes.detailContainer}>
				{/* Left carousel */}
				<Carousel sx={{ flex: '1', marginBottom: 1 }}>
					{shoppingDetail.imageList.map((image, i) => (
						<Image
							key={i}
							src={image.url}
							alt={image.url}
							width="100%"
							height="100%"
							layout="responsive"
							objectFit="cover"
							loading="lazy"
							placeholder="blur"
							blurDataURL={image.url}
						/>
					))}
				</Carousel>
				{/* Right description box */}
				<Box
					flex="1"
					borderLeft={1}
					borderColor="#aaa"
					display="flex"
					flexDirection="column"
				>
					<Typography
						variant="h5"
						component="h1"
						padding={2}
						borderBottom={1}
						borderColor="#aaa"
						letterSpacing={1}
					>
						{shoppingDetail.title}
					</Typography>
					<Typography
						padding={2}
						borderBottom={1}
						borderColor="#aaa"
						letterSpacing={1}
					>
						商品介紹：{shoppingDetail.description}
					</Typography>
					<Typography
						padding={2}
						borderBottom={1}
						borderColor="#aaa"
						letterSpacing={1}
					>
						種類：{shoppingDetail.category}
					</Typography>
					<Typography
						padding={2}
						borderBottom={1}
						borderColor="#aaa"
						letterSpacing={1}
					>
						建立使用者：{shoppingDetail.postedBy.userName}
					</Typography>
					<Typography
						variant="h5"
						component="h2"
						padding={2}
						borderBottom={1}
						borderColor="#aaa"
						letterSpacing={1}
						display="flex"
						alignItems="center"
						gap={1}
					>
						<Typography>價格：</Typography>
						{shoppingDetail.price}
						<Typography>NTD</Typography>
					</Typography>
					{/* Button group */}
					{userProfile && (
						<Box padding={2} display="flex" gap={2} alignItems="center">
							<IconButton
								aria-label="delete"
								onClick={() => {
									if (amount > 1) setAmount(prevState => prevState - 1);
								}}
								disabled={isLoading}
							>
								<RemoveOutlinedIcon />
							</IconButton>
							<Typography>{amount}</Typography>
							<IconButton
								aria-label="add"
								onClick={() => {
									if (amount < 999) setAmount(prevState => prevState + 1);
								}}
								disabled={isLoading}
							>
								<AddOutlinedIcon />
							</IconButton>
							{/* Add into cart button */}
							<IconButton
								aria-label="add"
								onClick={addToCartHandler}
								disabled={isLoading}
							>
								<AddShoppingCartIcon color="primary" />
							</IconButton>
						</Box>
					)}
					{/* Update button */}
					{userProfile && userProfile._id === shoppingDetail.postedBy._id && (
						<Button
							variant="outlined"
							color="info"
							sx={{ margin: 'auto 1rem 0.5rem' }}
							onClick={() => router.push(`/shoppingsite/updateItem/${_id}`)}
							disabled={isLoading}
						>
							更新商品
						</Button>
					)}
					{/* Delete button */}
					{userProfile && userProfile._id === shoppingDetail.postedBy._id && (
						<>
							<Button
								variant="outlined"
								color="error"
								sx={{ margin: '0.5rem 1rem 1rem' }}
								onClick={() => setAlertDialogIsOpen(true)}
							>
								刪除商品
							</Button>
							<AlertDialog
								title="確定要刪除商品嗎?"
								description="刪除後就不會在此頁面中出現，確定要刪除嗎?"
								successHandler={deleteItemHandler}
							/>
						</>
					)}
				</Box>
			</Box>
			<Typography padding={2} borderTop={1} borderColor="#aaa">
				商品最後更新日期：
				{new Date(date).toLocaleDateString('zh-TW', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</Typography>
		</Box>
	);
};

export default ShoppingDetail;
