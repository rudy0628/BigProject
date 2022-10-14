import React, { useState, useCallback } from 'react';
import {
	Box,
	Button,
	Typography,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Image from 'next/image';
import { isIataCode, isNotEmpty } from '../../../utility/validator';

import useUiStore from '../../../store/uiStore';
import useTicketStore from '../../../store/ticketStore';
import useInput from '../../../hooks/useInput';
import useAirtshopStyles from '../../../styles/airtshop';

interface IProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const TicketForm = ({ setStep }: IProps) => {
	const { isLoading, setIsLoading, setMessageBar, isDarkMode } = useUiStore();
	const { setTickets, setTicketInfo } = useTicketStore();
	const [passenger, setPassenger] = useState('');
	const [classType, setClassType] = useState('');
	const classes = useAirtshopStyles();

	const {
		value: departValue,
		hasError: departHasError,
		valueChangeHandler: departChangeHandler,
		inputBlurHandler: departBlurHandler,
		reset: departReset,
	} = useInput(isIataCode, '');

	const {
		value: arriveValue,
		hasError: arriveHasError,
		valueChangeHandler: arriveChangeHandler,
		inputBlurHandler: arriveBlurHandler,
		reset: arriveReset,
	} = useInput(isIataCode, '');

	const {
		value: departDateValue,
		hasError: departDateHasError,
		valueChangeHandler: departDateChangeHandler,
		inputBlurHandler: departDateBlurHandler,
		reset: departDateReset,
	} = useInput(isNotEmpty, '');

	const passengerChangeHandler = (e: SelectChangeEvent) =>
		setPassenger(e.target.value as string);
	const classTypeChangeHandler = (e: SelectChangeEvent) =>
		setClassType(e.target.value as string);

	const inputReset = useCallback(() => {
		departReset();
		arriveReset();
		departDateReset();
		setPassenger('');
		setClassType('');
	}, [arriveReset, departDateReset, departReset]);

	const searchHandler = useCallback(async () => {
		if (
			departHasError ||
			arriveHasError ||
			departDateHasError ||
			passenger === '' ||
			classType === ''
		) {
			setMessageBar(true, 'error', '請輸入有效資訊！');
			return;
		}

		setIsLoading(true);
		try {
			await setTickets(departValue, arriveValue);
			setTicketInfo({
				classType,
				passenger,
				date: new Date(departDateValue).getTime(),
			});
			setIsLoading(false);
		} catch (e: any) {
			setMessageBar(true, 'error', '搜尋機票失敗，請再試一次！');
			setIsLoading(false);
			return;
		}

		inputReset();

		setStep(2);
	}, [
		arriveHasError,
		arriveValue,
		classType,
		departDateHasError,
		departDateValue,
		departHasError,
		departValue,
		inputReset,
		passenger,
		setIsLoading,
		setMessageBar,
		setStep,
		setTicketInfo,
		setTickets,
	]);

	return (
		<Box sx={{ height: '100vh', width: '100%', position: 'relative' }}>
			{/* Background image */}
			<Image
				src="https://source.unsplash.com/random/?beach,city"
				alt="https://source.unsplash.com/random/?beach,city"
				layout="fill"
				objectFit="cover"
				loading="lazy"
				placeholder="blur"
				blurDataURL="https://source.unsplash.com/random/?beach,city"
			/>
			{/* Form */}
			<Box
				className={classes.airtshopFormBox}
				sx={{ backgroundColor: isDarkMode ? '#111' : '#fff' }}
			>
				<Typography variant="h4" component="h1" textAlign="center">
					查詢航班
				</Typography>
				<Box className={classes.InputBox}>
					{/* depart */}
					<FormControl fullWidth>
						<InputLabel htmlFor="depart" error={departHasError}>
							起飛*
						</InputLabel>
						<OutlinedInput
							id="depart"
							onChange={departChangeHandler}
							label="Depart"
							value={departValue}
							onBlur={departBlurHandler}
							error={departHasError}
							disabled={isLoading}
						/>
					</FormControl>
					{/* arrive */}
					<FormControl fullWidth>
						<InputLabel htmlFor="arrive" error={arriveHasError}>
							抵達*
						</InputLabel>
						<OutlinedInput
							id="arrive"
							onChange={arriveChangeHandler}
							label="Arrive"
							value={arriveValue}
							onBlur={arriveBlurHandler}
							error={arriveHasError}
							disabled={isLoading}
						/>
					</FormControl>
				</Box>
				{/* Depart time */}
				<FormControl fullWidth sx={{ marginTop: 2 }}>
					<InputLabel htmlFor="depart" error={departDateHasError}>
						起飛時間*
					</InputLabel>
					<OutlinedInput
						id="depart"
						startAdornment={<InputAdornment position="start" />}
						label="Price"
						type="datetime-local"
						value={departDateValue}
						onChange={departDateChangeHandler}
						onBlur={departDateBlurHandler}
						error={departDateHasError}
						disabled={isLoading}
					/>
				</FormControl>
				<Box className={classes.InputBox}>
					{/* passenger */}
					<FormControl fullWidth>
						<InputLabel htmlFor="passenger">票種*</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={passenger}
							label="Passenger"
							onChange={passengerChangeHandler}
							disabled={isLoading}
						>
							<MenuItem value="孩童票">孩童（0 ~ 12 歲）</MenuItem>
							<MenuItem value="成人票">成人（13 ~ 65 歲）</MenuItem>
							<MenuItem value="愛心票">愛心（66 歲以上）</MenuItem>
						</Select>
					</FormControl>
					{/* classType */}
					<FormControl fullWidth>
						<InputLabel htmlFor="classType">艙位*</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={classType}
							label="ClassType"
							onChange={classTypeChangeHandler}
							disabled={isLoading}
						>
							<MenuItem value="經濟艙">經濟艙</MenuItem>
							<MenuItem value="商務艙">商務艙</MenuItem>
							<MenuItem value="頭等艙">頭等艙</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box className={classes.buttonBox}>
					<LoadingButton
						variant="contained"
						onClick={searchHandler}
						loading={isLoading}
						fullWidth
					>
						查詢
					</LoadingButton>
					<Button
						variant="outlined"
						fullWidth
						onClick={inputReset}
						disabled={isLoading}
					>
						清空
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TicketForm;
