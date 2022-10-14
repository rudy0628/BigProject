import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';
import {
	Box,
	Button,
	Container,
	CardContent,
	Card,
	Divider,
	FormControl,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Ticket from './Ticket';

import { isNotEmpty, isEmail } from '../../../utility/validator';
import { getCardOptions } from '../../../utility';
import { generateSeat, generateGate } from '../../../utility/data/airtshopData';

import { useRouter } from 'next/router';
import useAirtshopStyles from '../../../styles/airtshop';
import useTicketStore from '../../../store/ticketStore';
import useInput from '../../../hooks/useInput';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import useGeoLocation from '../../../hooks/useGeoLocation';

interface IProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const TicketCheckout = ({ setStep }: IProps) => {
	const {
		value: fullNameValue,
		hasError: fullNameHasError,
		valueChangeHandler: fullNameChangeHandler,
		inputBlurHandler: fullNameBlurHandler,
		reset: fullNameReset,
	} = useInput(isNotEmpty, '');

	const {
		value: emailValue,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput(isEmail, '');

	const [phoneNumber, setPhoneNumber] = useState<any>('');
	const [countryCode, setCountryCode] = useState<string>('');

	// stripe
	const stripe = useStripe();
	const elements = useElements();

	// zustand store
	const { selectedTicket, resetTickets } = useTicketStore();
	const { setIsLoading, isLoading, isDarkMode, setMessageBar } = useUiStore();
	const { userProfile }: any = useAuthStore();
	const classes = useAirtshopStyles();

	// router
	const router = useRouter();

	// stripe credit cart styles
	const CARD_OPTIONS = getCardOptions(isDarkMode, isLoading);

	// geolocation
	const location = useGeoLocation();
	const lat = Number(JSON.stringify(location.coordinates.lat));
	const lng = Number(JSON.stringify(location.coordinates.lng));

	// get token
	const token = localStorage.getItem('token');

	// get country code
	useEffect(() => {
		const getCountryCode = async () => {
			const response = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&pretty=1&key=f3b395e5164446fba668dccdb034f75e`
			);

			const countryCode = response.data.results[0].components.country_code;

			setCountryCode(countryCode);
		};

		getCountryCode();
	}, [lat, lng]);

	// reset
	const inputReset = useCallback(() => {
		fullNameReset();
		emailReset();
		setPhoneNumber('');
	}, [emailReset, fullNameReset]);

	// add ticket into ticketCart
	const addIntoCart = useCallback(
		async (ticketId: string) => {
			try {
				await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/airtshop/ticketCart`,
					{
						userId: userProfile._id,
						newTicket: {
							_key: ticketId,
							ticket: {
								_type: 'ticket',
								...selectedTicket,
							},
							fullName: fullNameValue,
							email: emailValue,
							phoneNumber,
							boardingGate: generateGate(),
							seat: generateSeat(),
						},
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (e) {
				setIsLoading(false);
				setMessageBar(true, 'error', '加入已訂購機票失敗，請再試一次!');
				throw new Error();
			}
		},
		[
			emailValue,
			fullNameValue,
			phoneNumber,
			selectedTicket,
			setIsLoading,
			setMessageBar,
			token,
			userProfile,
		]
	);

	// get the SMS and email data
	const { depart, departTime, arrive, arriveTime, classType, passenger } =
		selectedTicket;

	// send email
	const sendEmailReceipt = useCallback(
		async (ticketId: string) => {
			const date = new Intl.DateTimeFormat('zh-TW').format(new Date());
			const { userName } = userProfile;

			const templateParams = {
				ticketId,
				userName,
				date,
				depart,
				departTime,
				arrive,
				arriveTime,
				classType,
				passenger,
				email: emailValue,
			};

			try {
				await emailjs.send(
					process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
					process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
					templateParams,
					process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
				);
			} catch (e) {
				setIsLoading(false);
				setMessageBar(true, 'error', '訂單訊息傳送失敗，請再試一次!');
				throw new Error();
			}
		},
		[
			arrive,
			arriveTime,
			classType,
			depart,
			departTime,
			emailValue,
			passenger,
			setIsLoading,
			setMessageBar,
			userProfile,
		]
	);

	// send SMS
	const sendSMSReceipt = useCallback(
		async (ticketId: string) => {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendMessage`,
				{
					phone: `${phoneNumber}`,
					message: `訂單編號 ${ticketId}\n起飛地點：${depart}\n起飛時間：${departTime}\n抵達地點：${arrive}\n抵達地點：${arriveTime}\n艙位：${classType}\n票種：${passenger}\nAirtshop團隊 Rudy Yeh\n祝您旅途順心，平安。`,
				}
			);

			const { success } = response.data;

			if (!success) {
				setIsLoading(false);
				setMessageBar(true, 'error', '簡訊傳送失敗，請再試一次!');
				throw new Error();
			}
		},
		[
			arrive,
			arriveTime,
			classType,
			depart,
			departTime,
			passenger,
			phoneNumber,
			setIsLoading,
			setMessageBar,
		]
	);

	// stripe payment Handler
	const stripePaymentHandler = useCallback(
		async (id: string) => {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/session`,
				{
					amount: selectedTicket.price * 100,
					id,
					userId: userProfile._id,
					userName: userProfile.userName,
					text: '支付項目:Airtshop',
				}
			);

			// Get the data from response
			return response.data.success;
		},
		[selectedTicket, userProfile]
	);

	// add movement
	const addMovement = useCallback(async () => {
		// item list string
		const ticketString = `${depart} 到 ${arrive}，${classType} / ${passenger}一張`;

		// new movement
		const movement = {
			_type: 'movements',
			_id: uuidv4(),
			user: {
				_type: 'postedBy',
				_ref: userProfile._id,
			},
			product: 'Airtshop',
			movement: `${userProfile.userName} 購買了：${ticketString}`,
			totalPrice: selectedTicket.price,
			date: new Date().toLocaleString('zh-TW'),
			itemUrl: '/airtshop',
		};

		try {
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movement`, movement, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (e) {
			setIsLoading(false);
			setMessageBar(true, 'error', '動態新增失敗，請再試一次!');
			throw new Error();
		}
	}, [
		arrive,
		classType,
		depart,
		passenger,
		selectedTicket.price,
		setIsLoading,
		setMessageBar,
		token,
		userProfile,
	]);

	// handle checkout
	const checkoutHandler = useCallback(async () => {
		// check if input has error
		if (fullNameHasError || emailHasError || !isNotEmpty(phoneNumber)) {
			setMessageBar(true, 'error', '請輸入有效資訊!');
			return;
		}

		setIsLoading(true);

		// create payment method
		const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
			type: 'card',
			card: elements?.getElement(CardElement)!,
		});

		// if no error
		if (!error) {
			const { id } = paymentMethod;

			const isSuccess = await stripePaymentHandler(id);

			// if checkout success
			if (isSuccess) {
				// create ticketId for email and zustand
				const ticketId = uuidv4();

				try {
					// add into cart
					await addIntoCart(ticketId);

					// Send the email checkout receipt to user
					await sendEmailReceipt(ticketId);

					// Send SMS to phone
					await sendSMSReceipt(ticketId);

					// add movement
					await addMovement();
				} catch (e) {
					return;
				}

				setIsLoading(false);

				inputReset();
				resetTickets();

				setMessageBar(true, 'success', '訂購成功!');
				router.push('/airtshop/ticketCart');
			} else {
				setIsLoading(false);
				setMessageBar(true, 'error', '訂購失敗!');
				return;
			}
		}
	}, [
		addIntoCart,
		addMovement,
		elements,
		emailHasError,
		fullNameHasError,
		inputReset,
		phoneNumber,
		resetTickets,
		router,
		sendEmailReceipt,
		sendSMSReceipt,
		setIsLoading,
		setMessageBar,
		stripe,
		stripePaymentHandler,
	]);

	return (
		<Container maxWidth="sm" sx={{ paddingBottom: 4, paddingTop: 18 }}>
			<Card>
				<Ticket ticket={selectedTicket} />
				<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Divider />
					{/* full name */}
					<FormControl fullWidth>
						<InputLabel htmlFor="fullName" error={fullNameHasError}>
							姓名*
						</InputLabel>
						<OutlinedInput
							id="fullName"
							onChange={fullNameChangeHandler}
							label="FullName"
							value={fullNameValue}
							onBlur={fullNameBlurHandler}
							error={fullNameHasError}
							disabled={isLoading}
						/>
					</FormControl>
					{/* email */}
					<FormControl fullWidth>
						<InputLabel htmlFor="email" error={emailHasError}>
							電子信箱*
						</InputLabel>
						<OutlinedInput
							id="email"
							onChange={emailChangeHandler}
							label="Email"
							value={emailValue}
							onBlur={emailBlurHandler}
							error={emailHasError}
							disabled={isLoading}
						/>
					</FormControl>
					{/* phone number */}
					<FormControl fullWidth>
						<MuiPhoneNumber
							id="phoneNumber"
							defaultCountry={countryCode || 'us'}
							label="電話號碼"
							onChange={value => setPhoneNumber(value)}
							value={phoneNumber}
							disabled={isLoading}
						/>
					</FormControl>
					{/* checkout input */}
					<CardElement options={CARD_OPTIONS} />
					{/* button box */}
					<Box className={classes.buttonBox}>
						<LoadingButton
							variant="contained"
							loading={isLoading}
							fullWidth
							onClick={checkoutHandler}
						>
							確認付款
						</LoadingButton>
						<Button
							variant="outlined"
							fullWidth
							disabled={isLoading}
							onClick={() => {
								setStep(2);
								inputReset();
							}}
						>
							取消訂購
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default TicketCheckout;
