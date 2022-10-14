import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
	Container,
	Box,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	Typography,
	Select,
	MenuItem,
	ListSubheader,
	TextField,
	Button,
	IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import type { SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Image from 'next/image';
import { ShoppingDetail } from '../../../type';

import { useRouter } from 'next/router';
import useInput from '../../../hooks/useInput';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import useNewShoppingItemStyle from '../../../styles/shoppingsite/newShoppingItem';

import { categories } from '../../../utility/data/shoppingsiteData';
import { isNotEmpty, priceMaxAndMin } from '../../../utility/validator';

interface IProps {
	shoppingDetail?: ShoppingDetail;
}

const ShoppingItemForm = ({ shoppingDetail }: IProps) => {
	// Update Page variable
	let existTitle, existCategory, existPrice, existDescription, existImageList;

	if (shoppingDetail) {
		const { title, category, price, description, imageList } = shoppingDetail;

		existTitle = title;
		existCategory = category;
		existPrice = price;
		existDescription = description;
		existImageList = imageList;
	}

	const token = localStorage.getItem('token');
	const [category, setCategory] = useState(existCategory || '');
	const [imageList, setImageList] = useState<any>(existImageList || []);
	const [removeCloudImageUrl, setRemoveCloudImageUrl] = useState<string[]>([]);
	const { isLoading, setIsLoading, setMessageBar } = useUiStore();
	const { userProfile }: any = useAuthStore();
	const classes = useNewShoppingItemStyle();
	const router = useRouter();

	// title, price, description use useInput management data
	const {
		value: titleValue,
		hasError: titleHasError,
		valueChangeHandler: titleChangeHandler,
		inputBlurHandler: titleBlurHandler,
		reset: titleReset,
	} = useInput(isNotEmpty, existTitle || '');

	const {
		value: priceValue,
		hasError: priceHasError,
		valueChangeHandler: priceChangeHandler,
		inputBlurHandler: priceBlurHandler,
		reset: priceReset,
	} = useInput(priceMaxAndMin, existPrice || '');

	const {
		value: descriptionValue,
		hasError: descriptionHasError,
		valueChangeHandler: descriptionChangeHandler,
		inputBlurHandler: descriptionBlurHandler,
		reset: descriptionReset,
	} = useInput(isNotEmpty, existDescription || '');

	// category change
	const categoryInputHandler = useCallback((e: SelectChangeEvent) => {
		setCategory(e.target.value);
	}, []);

	// upload image change
	const uploadImageHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				const files = e.target.files;
				let amount = 0;
				for (let i = 0; i < files.length; i++) {
					// if size exceed limited size
					if (files[i].size >= 10485760) {
						amount++;
						continue;
					}
					const image = {
						file: files[i],
						id: uuidv4(),
					};
					setImageList((prevState: any) => [...prevState, image]);
				}

				if (amount > 0) {
					setMessageBar(
						true,
						'error',
						`${amount}張圖片超過限制大小，已自動移除，請重新上傳`
					);
				}
			}
		},
		[setMessageBar]
	);

	// remove image from image list
	const removeImage = useCallback(
		(text: string, updateEnv: string) => {
			let updatedImageList;
			if (updateEnv === 'local') {
				updatedImageList = imageList.filter((image: any) => image.id !== text);
			}

			if (updateEnv === 'cloud') {
				updatedImageList = imageList.filter(
					(image: any) => image.public_id !== text
				);
				setRemoveCloudImageUrl(prevState => [...prevState, text]);
			}

			if (updatedImageList.length > 0) {
				setImageList(updatedImageList);
			} else {
				setMessageBar(true, 'error', '這項商品最少需要一張圖片!');
				return;
			}
		},
		[imageList, setMessageBar]
	);

	// image file to image url
	const imageFileListToURLList = useCallback(
		async (imageList: any) => {
			const uploadImagesURL = [];
			const formData = new FormData();
			for (let i = 0; i < imageList.length; i++) {
				// if image list item is url, push the url object and continue
				if (!imageList[i].file) {
					uploadImagesURL.push({
						_key: uuidv4(),
						_type: 'imageList',
						url: imageList[i].url,
						public_id: imageList[i].public_id,
					});
					continue;
				}

				// add the file into form data
				formData.append('file', imageList[i].file);
				formData.append(
					'upload_preset',
					`${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}`
				);

				// upload to cloudinary
				let responseData;
				try {
					const response = await fetch(
						`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_APP_ID}/image/upload`,
						{
							method: 'POST',
							body: formData,
						}
					);

					responseData = await response.json();
				} catch (e: any) {
					setMessageBar(true, 'error', '圖片上船失敗，請重新再試!');
					return;
				}

				uploadImagesURL.push({
					_key: uuidv4(),
					_type: 'imageList',
					url: responseData.secure_url,
					public_id: responseData.public_id,
				});
			}

			return uploadImagesURL;
		},
		[setMessageBar]
	);

	// clear input
	const clearInput = useCallback(() => {
		titleReset();
		priceReset();
		descriptionReset();
		setCategory('');
		setImageList([]);
	}, [descriptionReset, priceReset, titleReset]);

	// add item submit
	const submitHandler = useCallback(async () => {
		// check if input is not valid
		if (
			titleHasError ||
			priceHasError ||
			descriptionHasError ||
			!category.length ||
			!imageList.length
		) {
			setMessageBar(true, 'error', '請輸入有效的資訊!');
			return;
		}

		// is loading
		setIsLoading(true);

		// add images to cloudinary and get image urls
		const uploadImagesURL = await imageFileListToURLList(imageList);

		// remove the image from cloudinary
		if (removeCloudImageUrl.length > 0) {
			for (const text of removeCloudImageUrl) {
				try {
					await axios.patch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/cloudinary`,
						{
							public_id: text,
						}
					);
				} catch (e: any) {
					setMessageBar(true, 'error', '圖片移除失敗，請再試一次!');
					setIsLoading(false);
				}
			}
		}

		// create new item object
		const newItem = {
			_id: uuidv4(),
			_type: 'shoppingItem',
			title: titleValue,
			category: category,
			price: +priceValue,
			description: descriptionValue,
			imageList: uploadImagesURL,
			postedBy: {
				_type: 'postedBy',
				_ref: userProfile._id,
			},
			date: new Date(),
		};

		// Call post shopping item api
		if (shoppingDetail) {
			try {
				await axios.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingItem/${shoppingDetail._id}`,
					newItem,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (e: any) {
				setMessageBar(true, 'error', '商品更新失敗，請再試一次!');
				setIsLoading(false);
				return;
			}
		} else {
			try {
				await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingItem`,
					newItem,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (e: any) {
				setMessageBar(true, 'error', '商品上傳失敗，請再試一次!');
				setIsLoading(false);
				return;
			}
		}

		// clear input
		clearInput();

		// not loading
		setIsLoading(false);

		// show message bar add item success.
		setMessageBar(
			true,
			'success',
			`${shoppingDetail ? '更新' : '新增'}商品成功`
		);

		// go back to shoppingsite main page
		if (shoppingDetail) {
			router.push(`/shoppingsite/${shoppingDetail._id}`);
		} else {
			router.push('/shoppingsite');
		}
	}, [
		category,
		clearInput,
		descriptionHasError,
		descriptionValue,
		imageFileListToURLList,
		imageList,
		priceHasError,
		priceValue,
		removeCloudImageUrl,
		router,
		setIsLoading,
		setMessageBar,
		shoppingDetail,
		titleHasError,
		titleValue,
		token,
		userProfile,
	]);

	// cancel handler
	const cancelHandler = useCallback(() => {
		if (shoppingDetail) {
			router.push(`/shoppingsite/${shoppingDetail._id}`);
		} else {
			clearInput();
		}
	}, [clearInput, router, shoppingDetail]);

	// authentication
	useEffect(() => {
		if (!userProfile) {
			router.push('/shoppingsite');
		}
	}, [userProfile, router]);

	if (!userProfile) {
		return null;
	}

	return (
		<Container maxWidth="xl">
			<Box margin="0 auto" padding="2rem 0" className={classes.formContainer}>
				<Typography variant="h4" component="h1" textAlign="center">
					{shoppingDetail ? '更新' : '新增'}商品
				</Typography>
				{/* title */}
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="title" error={titleHasError}>
						名稱
					</InputLabel>
					<OutlinedInput
						id="title"
						onChange={titleChangeHandler}
						label="Title"
						value={titleValue}
						onBlur={titleBlurHandler}
						error={titleHasError}
						disabled={isLoading}
					/>
				</FormControl>
				{/* category */}
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="categories">商品種類</InputLabel>
					<Select
						defaultValue="衣服"
						id="categories"
						label="categories"
						onChange={categoryInputHandler}
						value={category}
						disabled={isLoading}
					>
						{categories.map((category, i) => {
							const items = category.list.map(item => (
								<MenuItem key={item} value={`${category.type}/${item}`}>
									{item}
								</MenuItem>
							));
							return [
								<ListSubheader key={i}>{category.type}</ListSubheader>,
								items,
							];
						})}
					</Select>
				</FormControl>
				{/* price */}
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="price" error={priceHasError}>
						價格
					</InputLabel>
					<OutlinedInput
						id="price"
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label="Price"
						type="number"
						value={priceValue}
						onChange={priceChangeHandler}
						onBlur={priceBlurHandler}
						error={priceHasError}
						disabled={isLoading}
					/>
				</FormControl>
				{/* description */}
				<FormControl fullWidth sx={{ m: 1 }}>
					<TextField
						id="outlined-multiline-static"
						label="商品描述"
						multiline
						rows={3}
						value={descriptionValue}
						onChange={descriptionChangeHandler}
						onBlur={descriptionBlurHandler}
						error={descriptionHasError}
						disabled={isLoading}
					/>
				</FormControl>
				{/* upload image */}
				<FormControl fullWidth sx={{ m: 1 }}>
					<Button variant="outlined" component="label" disabled={isLoading}>
						上傳圖片
						<input
							type="file"
							accept="image/*"
							hidden
							multiple
							onChange={uploadImageHandler}
						/>
					</Button>
				</FormControl>
				{/* imageList */}
				<Box margin={1} display="flex" gap={1} flexWrap="wrap">
					{imageList.map((image: any, i: number) => {
						const imageSource =
							typeof image.url === 'string'
								? image.url
								: URL.createObjectURL(image.file);

						return (
							<Box key={i} position="relative">
								<Image
									width={100}
									height={100}
									objectFit="fill"
									src={imageSource}
									alt="test"
									style={{ borderRadius: '10px' }}
									loading="lazy"
									placeholder="blur"
									blurDataURL={imageSource}
								/>
								<IconButton
									aria-label="delete"
									sx={{ position: 'absolute', top: 3, right: 3, color: '#fff' }}
									onClick={() =>
										image.id
											? removeImage(image.id, 'local')
											: removeImage(image.public_id, 'cloud')
									}
									disabled={isLoading}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						);
					})}
				</Box>
				{/* Sending button */}
				<Box className={classes.btnContainer}>
					<LoadingButton
						loading={isLoading}
						variant="contained"
						sx={{ flex: 1 }}
						onClick={submitHandler}
					>
						送出
					</LoadingButton>
					<Button
						variant="outlined"
						sx={{ flex: 1 }}
						onClick={cancelHandler}
						disabled={isLoading}
					>
						{shoppingDetail ? '返回' : '清空'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ShoppingItemForm;
