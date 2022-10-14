import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
	Box,
	Container,
	FormControl,
	TextField,
	Typography,
	Rating,
	IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import NoResults from '../../utils/NoResults';

import useInput from '../../../hooks/useInput';
import useShoppingCommentsStyles from '../../../styles/shoppingsite/shoppingComments';
import useUiStore from '../../../store/uiStore';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/router';

import { isNotEmpty } from '../../../utility/validator';
import { ShoppingComment as IShoppingComment } from '../../../type';

interface IProps {
	shoppingComments: IShoppingComment[];
	shoppingItemId: string;
}

const ShoppingCommentForm = ({
	shoppingItemId,
}: {
	shoppingItemId: string;
}) => {
	const token = localStorage.getItem('token');
	const [review, setReview] = useState(0);
	const { isLoading, setIsLoading, setMessageBar } = useUiStore();
	const { userProfile }: any = useAuthStore();
	const router = useRouter();

	const {
		value: commentValue,
		hasError: commentHasError,
		valueChangeHandler: commentChangeHandler,
		inputBlurHandler: commentBlurHandler,
		reset: commentReset,
	} = useInput(isNotEmpty, '');

	const clearInput = useCallback(() => {
		commentReset();
		setReview(0);
	}, [commentReset]);

	const addCommentHandler = useCallback(async () => {
		if (commentHasError || review === 0) {
			return;
		}

		const newComment = {
			comment: commentValue,
			review: review,
			userId: userProfile._id,
		};

		setIsLoading(true);

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingComments/${shoppingItemId}`,
				newComment,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (e: any) {
			setMessageBar(true, 'error', '新增留言失敗，請再試一次!');
			return;
		}

		setIsLoading(false);

		// clear input
		clearInput();

		// show Message bar
		setMessageBar(true, 'success', '新增留言成功!');

		// refresh
		router.push(`/shoppingsite/${shoppingItemId}`);
	}, [
		clearInput,
		commentHasError,
		commentValue,
		review,
		router,
		setIsLoading,
		setMessageBar,
		shoppingItemId,
		token,
		userProfile,
	]);

	return (
		<Box flex="1">
			<Typography variant="h5" component="h2" marginBottom={2}>
				新增評論
			</Typography>
			<Rating
				name="simple-controlled"
				value={review}
				onChange={(event: any, review: any) => setReview(review)}
			/>
			<FormControl fullWidth sx={{ my: 2 }}>
				<TextField
					id="outlined-multiline-static"
					label="評論"
					multiline
					rows={3}
					value={commentValue}
					onChange={commentChangeHandler}
					onBlur={commentBlurHandler}
					error={commentHasError}
					disabled={isLoading}
				/>
			</FormControl>
			<LoadingButton
				variant="contained"
				size="large"
				onClick={addCommentHandler}
				fullWidth
				loading={isLoading}
			>
				送出
			</LoadingButton>
		</Box>
	);
};

const ShoppingComments = ({ shoppingComments, shoppingItemId }: IProps) => {
	const token = localStorage.getItem('token');
	const classes = useShoppingCommentsStyles();
	const { userProfile }: any = useAuthStore();
	const { setMessageBar } = useUiStore();
	const router = useRouter();

	const deleteCommentHandler = useCallback(
		async (commentUserId: string, key: string) => {
			if (!commentUserId === userProfile._id || !userProfile) {
				return;
			}

			try {
				setMessageBar(true, 'warning', '刪除留言中...');
				await axios.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingComments/${shoppingItemId}`,
					{ key },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
							key,
						},
					}
				);
				setMessageBar(true, 'success', '刪除留言成功!');

				router.push(`/shoppingsite/${shoppingItemId}`);
			} catch (e: any) {
				setMessageBar(true, 'error', '刪除留言失敗，請再試一次!');
				return;
			}
		},
		[router, setMessageBar, shoppingItemId, token, userProfile]
	);

	return (
		<Container maxWidth="md" sx={{ marginY: 4 }}>
			<Typography variant="h4" component="h1" marginBottom={2}>
				評論區
			</Typography>
			<Box className={classes.commentsContainer}>
				{userProfile && <ShoppingCommentForm shoppingItemId={shoppingItemId} />}
				<Box flex="1">
					<Typography variant="h5" component="h2" marginBottom={2}>
						所有評論
					</Typography>
					<Box display="flex" flexDirection="column" gap={2}>
						{shoppingComments !== null &&
							shoppingComments.map(comment => (
								<Box
									key={comment._key}
									padding={2}
									border={1}
									borderColor="#ccc"
									borderRadius={1}
									position="relative"
								>
									<Rating name="read-only" value={comment.review} readOnly />
									<Typography variant="h6" component="h3">
										{comment.postedBy.userName}
									</Typography>
									<Typography marginTop={1}>{comment.comment}</Typography>
									{userProfile && userProfile._id === comment.postedBy._id && (
										<IconButton
											aria-label="delete"
											sx={{ position: 'absolute', right: 8, top: 8 }}
											onClick={() =>
												deleteCommentHandler(comment.postedBy._id, comment._key)
											}
										>
											<DeleteIcon />
										</IconButton>
									)}
								</Box>
							))}
						{(shoppingComments === null || shoppingComments.length === 0) && (
							<NoResults text="這項商品暫時沒有任何評論，快去評論吧!" />
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default ShoppingComments;
