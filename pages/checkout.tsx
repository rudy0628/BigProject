import React, { FormEvent, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Head from 'next/head';
import { Button, Box, Container, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getCardOptions } from '../utility';
import { ShoppingCartItem } from '../type';

import useShoppingCartStore from '../store/shoppingCartStore';
import useUiStore from '../store/uiStore';
import useAuthStore from '../store/authStore';
import { useRouter } from 'next/router';

export default function CheckOut() {
	const token = localStorage.getItem('token');

	// stripe
	const stripe = useStripe();
	const elements = useElements();

	// style store
	const { totalAmount, cartItems, clearCart }: any = useShoppingCartStore();

	// zustand store
	const { isLoading, setIsLoading, setMessageBar, isDarkMode } = useUiStore();
	const { userProfile }: any = useAuthStore();

	// router
	const router = useRouter();

	const numberFormat = new Intl.NumberFormat();
	const CARD_OPTIONS = getCardOptions(isDarkMode, isLoading);

	if (!userProfile || totalAmount === 0) {
		router.push('/shoppingsite');
	}

	const addMovement = useCallback(async () => {
		// item list string
		let itemsString = '';
		for (let i = 0; i < cartItems.length; i++) {
			if (i !== cartItems.length - 1) {
				itemsString += `${cartItems[i].shoppingItem.title} / ${cartItems[i].amount}個、`;
			} else {
				itemsString += `${cartItems[i].shoppingItem.title} / ${cartItems[i].amount}個。`;
			}
		}

		// new movement
		const movement = {
			_type: 'movements',
			_id: uuidv4(),
			user: {
				_type: 'postedBy',
				_ref: userProfile._id,
			},
			product: 'Shoppingsite',
			movement: `${userProfile.userName} 購買了：${itemsString}`,
			totalPrice: totalAmount,
			date: new Date().toLocaleString('zh-TW'),
			itemUrl: '/shoppingsite',
		};

		try {
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movement`, movement, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (e) {
			throw new Error();
		}
	}, [cartItems, token, totalAmount, userProfile]);

	const submitHandler = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			setIsLoading(true);

			// create payment method
			const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
				type: 'card',
				card: elements?.getElement(CardElement)!,
			});

			// if no error
			if (!error) {
				const { id } = paymentMethod;

				let data;
				try {
					// send to backend
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/session`,
						{
							amount: totalAmount * 100,
							id,
							userId: userProfile._id,
							userName: userProfile.userName,
							text: '支付項目:Shoppingsite',
						}
					);

					// Get the data from response
					data = response.data;
				} catch (e) {
					setIsLoading(false);
					setMessageBar(true, 'error', '付款失敗!');
					return;
				}

				// if checkout success
				if (data.success) {
					try {
						// add movement
						await addMovement();

						// clearCart
						await clearCart(userProfile._id);
					} catch (e) {
						setIsLoading(false);
						setMessageBar(true, 'error', '某些地方出了點問題，請再試一次!');
						return;
					}

					setIsLoading(false);
					router.push('/shoppingsite');
					setMessageBar(true, 'success', '付款成功!');
				} else {
					setIsLoading(false);
					setMessageBar(true, 'error', '付款失敗!');
					return;
				}
			}
		},
		[
			stripe,
			elements,
			setIsLoading,
			totalAmount,
			userProfile,
			setMessageBar,
			addMovement,
			router,
			clearCart,
		]
	);

	return (
		<>
			<Head>
				<title>BigProject - 付款</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="sm">
				<Box marginY={3} display="flex" flexDirection="column" gap={2}>
					{/* Heading text */}
					<Typography variant="h4" component="h1">
						付款
					</Typography>
					{/* item check */}
					<Box gap={1} maxHeight="20rem">
						{cartItems.map((item: ShoppingCartItem) => (
							// each item
							<Box key={item._key} marginBottom={1}>
								<Box display="flex" justifyContent="space-between">
									<Typography>{item.shoppingItem.title}</Typography>
									<Typography>
										NTD {numberFormat.format(+item.shoppingItem.price)} X{' '}
										{item.amount}
									</Typography>
								</Box>
								<Typography variant="h6" textAlign="right" marginTop={1}>
									金額：NTD{' '}
									{numberFormat.format(+item.shoppingItem.price * item.amount)}
								</Typography>
								<Divider sx={{ marginY: 1 }} />
							</Box>
						))}
						{/* total amount */}
						<Typography variant="h6" textAlign="right" marginTop={1}>
							總金額：NTD {numberFormat.format(totalAmount)}
						</Typography>
					</Box>
					{/* Submit form */}
					<form
						onSubmit={submitHandler}
						style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
					>
						{/* payment input */}
						<CardElement options={CARD_OPTIONS} />
						{/* Button group */}
						<LoadingButton
							loading={isLoading}
							type="submit"
							variant="contained"
							disabled={!stripe || !elements}
						>
							付款
						</LoadingButton>
						<Button
							type="button"
							variant="outlined"
							onClick={() => router.push('/shoppingsite')}
							disabled={isLoading}
						>
							取消
						</Button>
					</form>
				</Box>
			</Container>
		</>
	);
}
