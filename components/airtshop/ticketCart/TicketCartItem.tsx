import React, { useCallback } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Ticket from '../tickets/Ticket';

import useAirtshopStyles from '../../../styles/airtshop';
import useAuthStore from '../../../store/authStore';
import useUiStore from '../../../store/uiStore';
import { useRouter } from 'next/router';

import { TicketCartItem } from '../../../type';

const TicketCartItem = ({
	ticketCartItem,
}: {
	ticketCartItem: TicketCartItem;
}) => {
	const token = localStorage.getItem('token');
	const classes = useAirtshopStyles();
	const { userProfile }: any = useAuthStore();
	const { setMessageBar, setIsLoading } = useUiStore();
	const router = useRouter();

	const { ticket, _key } = ticketCartItem;

	const removeTicketHandler = useCallback(async () => {
		try {
			setIsLoading(true);

			await axios.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/airtshop/ticketCart`,
				{
					userId: userProfile._id,
					ticketId: _key,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setIsLoading(false);
			setMessageBar(true, 'success', '移除機票成功!');
			router.reload();
		} catch (e) {
			setIsLoading(false);
			setMessageBar(true, 'error', '移除機票失敗，請稍後再試!');
			return;
		}
	}, [_key, router, setIsLoading, setMessageBar, token, userProfile]);

	return (
		<Card sx={{ marginBottom: '1rem' }}>
			<Ticket ticket={ticket} />
			<CardContent className={classes.cartItemDetailBox}>
				<Box flex={1}>
					<Typography color="#777">乘客姓名</Typography>
					<Typography>{ticketCartItem.fullName}</Typography>
				</Box>
				<Box>
					<Typography color="#777">登機口</Typography>
					<Typography>{ticketCartItem.boardingGate}</Typography>
				</Box>
				<Box>
					<Typography color="#777">座位</Typography>
					<Typography>{ticketCartItem.seat}</Typography>
				</Box>
			</CardContent>
			{/* remove button */}
			{new Date() > new Date(ticket.departTime) && userProfile && (
				<CardContent>
					<Button
						variant="contained"
						color="error"
						onClick={removeTicketHandler}
						fullWidth
					>
						已過期，移除機票
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export default TicketCartItem;
