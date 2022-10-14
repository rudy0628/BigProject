import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';
import useMovementStyles from '../../styles/movement';

const ShoppingsiteScrollLoading = () => {
	return (
		<Grid container spacing={3}>
			{[1, 2, 3, 4].map(index => (
				<Grid key={index} item xs={12} sm={6} md={4} lg={3}>
					<Skeleton
						variant="rectangular"
						height={150}
						sx={{ borderRadius: '5px' }}
					/>
					<Box sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
						<Skeleton variant="text" sx={{ fontSize: '2rem', width: '50%' }} />
						<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
						<Skeleton variant="text" sx={{ fontSize: '1rem', width: '75%' }} />
						<Skeleton
							variant="text"
							sx={{ fontSize: '2rem', width: '50%', marginTop: '0.5rem' }}
						/>
						<Skeleton variant="text" sx={{ fontSize: '1rem', width: '75%' }} />
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

const AirtshopScrollLoading = () => {
	return (
		<Box sx={{ padding: '1rem' }}>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Skeleton
					variant="text"
					sx={{ fontSize: '2rem', width: '11%', borderRadius: '20px' }}
				/>
				<Skeleton
					variant="text"
					sx={{ fontSize: '2rem', width: '11%', borderRadius: '20px' }}
				/>
			</Box>
			<Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '40%' }} />
			<Skeleton
				variant="rectangular"
				sx={{ fontSize: '5.5rem', width: '100%' }}
			/>
			<Skeleton
				variant="rectangular"
				sx={{ fontSize: '2rem', width: '100%', marginTop: 2 }}
			/>
		</Box>
	);
};

const MovementScrollLoading = () => {
	const classes = useMovementStyles();

	return (
		<Box className={classes.movementsBox} sx={{ padding: '1rem' }}>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
				<Skeleton variant="circular" width={40} height={40} />
				<Skeleton variant="rounded" sx={{ fontSize: '2rem', width: '6rem' }} />
			</Box>
			<Skeleton
				variant="rectangular"
				sx={{ fontSize: '2rem', width: '12rem', marginTop: 2 }}
			/>
			<Skeleton
				variant="text"
				sx={{ fontSize: '1rem', width: '100%', marginTop: 2 }}
			/>
			<Skeleton
				variant="text"
				sx={{ fontSize: '1rem', width: '20rem', marginTop: 1 }}
			/>
			<Skeleton
				variant="rounded"
				sx={{ fontSize: '2rem', width: '5rem', marginTop: 1 }}
			/>
			<Skeleton
				variant="text"
				sx={{ fontSize: '1rem', width: '25%', marginTop: 1 }}
			/>
		</Box>
	);
};

interface IProps {
	productType: string;
}

const InfiniteScrollLoading = ({ productType }: IProps) => {
	if (productType === 'Shoppingsite') {
		return <ShoppingsiteScrollLoading />;
	}

	if (productType === 'Airtshop') {
		return <AirtshopScrollLoading />;
	}

	if (productType === 'Movement') {
		return <MovementScrollLoading />;
	}

	return <div>loading...</div>;
};

export default InfiniteScrollLoading;
