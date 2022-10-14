import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StoreIcon from '@mui/icons-material/Store';

import useIntroduceStyles from '../../styles/main/introduce';

const Introduce = () => {
	const classes = useIntroduceStyles();

	return (
		<Container maxWidth="xl" className={classes.introduceContainer}>
			<Typography variant="h4" className={classes.title}>
				快速、方便訂購任何商品與機票
			</Typography>
			<Typography variant="h6" className={classes.text}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis
				beatae numquam suscipit quam esse
			</Typography>
			<Box className={classes.cardContainer}>
				<Box className={classes.card}>
					<AirplanemodeActiveIcon className={classes.cardIcon} />
					<Typography fontWeight={700} variant="h5">
						為旅遊者建立
					</Typography>
					<Typography textAlign="center" color="#777">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Perspiciatis beatae numquam suscipit quam esse
					</Typography>
				</Box>
				<Box className={classes.card}>
					<TrendingUpIcon className={classes.cardIcon} />
					<Typography fontWeight={700} variant="h5">
						設計更為現代
					</Typography>
					<Typography textAlign="center" color="#777">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Perspiciatis beatae numquam suscipit quam esse
					</Typography>
				</Box>
				<Box className={classes.card}>
					<StoreIcon className={classes.cardIcon} />
					<Typography fontWeight={700} variant="h5">
						購買所有東西
					</Typography>
					<Typography textAlign="center" color="#777">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Perspiciatis beatae numquam suscipit quam esse
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};

export default Introduce;
