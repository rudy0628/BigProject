import React, { useEffect, useCallback } from 'react';
import { Drawer, Button, IconButton, Box, Typography } from '@mui/material';
import Image from 'next/image';

import useShoppingCartStyles from '../../../styles/shoppingsite/shoppingCart';
import useShoppingCartStore from '../../../store/shoppingCartStore';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/router';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NoResults from '../../utils/NoResults';

import { ShoppingCartItem as IShoppingCartItem } from '../../../type';

const numberFormat = new Intl.NumberFormat();

const ShoppingCartItem = ({ item }: { item: IShoppingCartItem }) => {
	const classes = useShoppingCartStyles();
	const { addIntoCart, removeFromCart } = useShoppingCartStore();
	const { userProfile }: any = useAuthStore();
	const { setMessageBar } = useUiStore();
	const { amount, shoppingItem } = item;

	const addOneHandler = useCallback(async () => {
		setMessageBar(true, 'warning', '商品新增中...');
		await addIntoCart(shoppingItem._id, 1, userProfile._id);
		setMessageBar(true, 'success', '商品新增成功...');
	}, [addIntoCart, setMessageBar, shoppingItem, userProfile]);

	const removeOneHandler = useCallback(async () => {
		setMessageBar(true, 'warning', '商品移除中...');
		await removeFromCart(shoppingItem._id, userProfile._id);
		setMessageBar(true, 'success', '商品移除成功...');
	}, [removeFromCart, setMessageBar, shoppingItem, userProfile]);

	return (
		<Box className={classes.shoppingCartItem}>
			{/* image */}
			<Box height="auto" className={classes.shoppingCartImage}>
				<Image
					src={shoppingItem.imageList[0].url}
					alt={shoppingItem.title}
					width="100%"
					height="100%"
					layout="responsive"
					objectFit="cover"
					loading="lazy"
				/>
			</Box>
			{/* text */}
			<Box className={classes.textBox}>
				<Typography variant="h6">{shoppingItem.title}</Typography>
				<Typography variant="body1" color="#999">
					{shoppingItem.description}
				</Typography>
				<Box className={classes.btnGroup}>
					<Box className={classes.modifyAmountBox}>
						<IconButton aria-label="delete" onClick={removeOneHandler}>
							<RemoveOutlinedIcon />
						</IconButton>
						<Typography>{amount}</Typography>
						<IconButton aria-label="add" onClick={addOneHandler}>
							<AddOutlinedIcon />
						</IconButton>
					</Box>
					<Typography marginLeft="auto" className={classes.amount}>
						金額：NTD {numberFormat.format(+shoppingItem.price * amount)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

interface IProps {
	cartIsOpen: boolean;
	setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingCart = ({ cartIsOpen, setCartIsOpen }: IProps) => {
	const { cartItems, clearCart, setTotalAmount, totalAmount }: any =
		useShoppingCartStore();
	const { userProfile }: any = useAuthStore();
	const { setMessageBar } = useUiStore();
	const classes = useShoppingCartStyles();
	const router = useRouter();

	// update total amount
	useEffect(() => {
		let totalAmount = 0;
		if (cartItems.length > 0) {
			for (const item of cartItems) {
				totalAmount += item.amount * item.shoppingItem.price;
			}
		}
		setTotalAmount(totalAmount);
	}, [cartItems, setTotalAmount]);

	const goToCheckoutHandler = useCallback(() => {
		if (cartItems.length === 0) {
			setMessageBar(
				true,
				'warning',
				'購物車內沒有任何商品，請加入商品後再結帳!'
			);
			return;
		}

		router.push('/checkout');
	}, [cartItems.length, router, setMessageBar]);

	const clearCartHandler = useCallback(async () => {
		setMessageBar(true, 'warning', '清空購物車中...');
		try {
			await clearCart(userProfile._id);
			setMessageBar(true, 'success', '清空購物車完成!');
		} catch (e: any) {
			setMessageBar(true, 'error', '清空購物車失敗!');
			return;
		}
	}, [clearCart, setMessageBar, userProfile]);

	return (
		<Drawer
			anchor="right"
			open={cartIsOpen}
			onClose={() => setCartIsOpen(false)}
		>
			{/* header */}
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				padding={2}
			>
				<Typography variant="h4">您的購物車</Typography>
				<Button
					sx={{ width: '3rem', height: '3rem' }}
					onClick={() => setCartIsOpen(false)}
				>
					<CancelOutlinedIcon />
				</Button>
			</Box>
			{/* cart items */}
			<Box padding={2} className={classes.cartContainer}>
				{cartItems.length > 0 &&
					userProfile &&
					cartItems.map((item: IShoppingCartItem) => (
						<ShoppingCartItem key={item._key} item={item} />
					))}
				{cartItems.length === 0 && userProfile && (
					<NoResults text="您的購物車沒有任何商品，快去挑選吧!" />
				)}
				{!userProfile && (
					<NoResults text="未登入帳號，快去建立/登入帳號挑選商品吧!" />
				)}
			</Box>
			{userProfile && (
				<Typography variant="h6" marginLeft={2}>
					總金額：NTD {numberFormat.format(totalAmount)}
				</Typography>
			)}
			{/* button group */}
			{userProfile && (
				<Box display="flex" width="100%" padding={2} gap={2}>
					<Button
						variant="contained"
						sx={{ flex: 1 }}
						onClick={goToCheckoutHandler}
					>
						結帳
					</Button>
					<Button
						variant="outlined"
						sx={{ flex: 1 }}
						onClick={clearCartHandler}
					>
						清空
					</Button>
				</Box>
			)}
		</Drawer>
	);
};

export default ShoppingCart;
