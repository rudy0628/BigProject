import React, { useCallback } from 'react';
import {
	Box,
	Button,
	CardContent,
	Chip,
	Divider,
	Typography,
} from '@mui/material';
import NoResults from '../../utils/NoResults';
import Image from 'next/image';

import useAirtshopStyles from '../../../styles/airtshop';
import useAuthStore from '../../../store/authStore';
import useTicketStore from '../../../store/ticketStore';

import { AirtshopTicket } from '../../../type';
import { transformTwoDigits } from '../../../utility';
import ssairlineLogo from '../../../utility/image/ssairlineLogo.png';

interface IProps {
	ticket: AirtshopTicket;
	step?: number;
	setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const numberFormat = new Intl.NumberFormat();

const Ticket = ({ ticket, step, setStep }: IProps) => {
	const { userProfile } = useAuthStore();
	const { setSelectedTicket } = useTicketStore();
	const classes = useAirtshopStyles();

	// get day and month
	const day = new Date(ticket.departTime).getDate();
	const month = new Date(ticket.departTime).getMonth() + 1;

	// count hours and minutes
	const duration = `${transformTwoDigits(
		Math.floor(+ticket.duration / 60)
	)} 時 ${transformTwoDigits(+ticket.duration % 60)} 分`;

	// to next step
	const selectHandler = useCallback(() => {
		if (setStep) setStep(3);
		setSelectedTicket(ticket);
	}, [setSelectedTicket, setStep, ticket]);

	return (
		<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Box display="flex" gap={1}>
				<Chip label={ticket.classType} />
				<Chip label={ticket.passenger} variant="outlined" />
			</Box>
			<Typography variant="h4" component="h1">
				NTD ${numberFormat.format(ticket.price)}
			</Typography>
			<Box className={classes.ticketDetailBox}>
				<Box className={classes.detailLeftBox}>
					{/* date */}
					<Box className={classes.dateBox}>
						<Typography variant="h6" color="#777">
							{day}
						</Typography>
						<Typography variant="h6" color="#777">
							{month}月
						</Typography>
					</Box>
					{/* image */}
					<Image
						src={ssairlineLogo}
						alt="ssairline"
						width="64"
						height="64"
						style={{ backgroundColor: '#fff', borderRadius: '10px' }}
					/>
				</Box>
				<Box className={classes.detailRightBox}>
					{/* depart */}
					<Box className={classes.flightBox}>
						<Typography variant="h6">
							{ticket.departTime.slice(ticket.departTime.length - 5)}
						</Typography>
						<Typography variant="h6" color="#777">
							{ticket.depart}
						</Typography>
					</Box>
					{/* duration */}
					<Box className={classes.durationBox}>
						<Typography variant="h6" color="primary" textAlign="center">
							直達
						</Typography>
						<Divider sx={{ color: '#777' }} />
						<Typography variant="h6" color="#777" textAlign="center">
							{duration}
						</Typography>
					</Box>
					{/* arrive */}
					<Box className={classes.flightBox} sx={{ alignItems: 'flex-end' }}>
						<Typography variant="h6">
							{ticket.arriveTime?.slice(ticket.arriveTime.length - 5)}
						</Typography>
						<Typography variant="h6" color="#777">
							{ticket.arrive}
						</Typography>
					</Box>
				</Box>
			</Box>
			{/* Select Button */}
			{step && step === 2 && userProfile && (
				<Button variant="contained" onClick={selectHandler}>
					訂購
				</Button>
			)}
			{/* Not login */}
			{!userProfile && <NoResults text="請登入後訂購機票!" />}
		</CardContent>
	);
};

export default Ticket;
