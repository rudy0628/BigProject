import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

import useMovementStyles from '../../styles/movement';
import { useRouter } from 'next/router';

import { Movement as IMovement } from '../../type';

interface IProps {
	movement: IMovement;
}

const Movement = ({ movement }: IProps) => {
	const classes = useMovementStyles();
	const router = useRouter();

	return (
		<Box className={classes.movementBox}>
			<Box
				className={classes.movementTitleBox}
				onClick={() => router.push(`/movement/${movement.user.userName}`)}
			>
				<Avatar alt={movement.user.userName} src={movement.user.image} />
				<Box>
					<Typography
						sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
					>
						{movement.user.userName} <VerifiedIcon color="primary" />
					</Typography>
					<Typography color="#777">{movement.user.userName}</Typography>
				</Box>
			</Box>
			<Typography variant="h6" marginTop={1}>
				產品：{movement.product}
			</Typography>
			<Typography marginTop={1}>{movement.movement}</Typography>
			<Button
				sx={{ marginTop: '0.5rem' }}
				onClick={() => router.push(`${movement.itemUrl}`)}
			>
				前往購買
			</Button>
			<Typography marginTop={1}>{movement.date}</Typography>
		</Box>
	);
};

export default Movement;
