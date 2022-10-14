import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import CountUp from 'react-countup';

import useNumberOfUsersStyles from '../../styles/main/numberOfUsers';

const NumberOfUsers = () => {
	const classes = useNumberOfUsersStyles();

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Box className={classes.textContainer}>
				<Typography variant="h4" fontWeight={700}>
					強大、彈性的功能提供給所有使用者
				</Typography>
				<Typography variant="h6" marginTop={2} color="#777" fontWeight={400}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe autem
					explicabo quidem adipisci! Vitae in aut blanditiis, repudiandae ipsum
					laudantium iure sit? Veniam placeat quia, natus corporis alias libero
					itaque.
				</Typography>
				<Box className={classes.cardContainer} marginTop={4}>
					<Box>
						<Typography color="#0288d1" variant="h4">
							<CountUp end={1000} />+
						</Typography>
						<Typography color="#777" marginTop={2}>
							1000 +
							商品在線上購物讓您選擇，家電、手機、冰箱等等家電一應俱全，多種選擇一次滿足。
						</Typography>
					</Box>
					<Box>
						<Typography color="#0288d1" variant="h4">
							<CountUp end={4500} />+
						</Typography>
						<Typography color="#777" marginTop={2}>
							每秒鐘售出4500 +
							機票，提供多元票價與班機選擇，讓您環遊各地無阻礙。
						</Typography>
					</Box>
					<Box>
						<Typography color="#0288d1" variant="h4">
							<CountUp end={99} />%
						</Typography>
						<Typography color="#777" marginTop={2}>
							超過99%客戶在五年內給予我們五星好評。
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box className={classes.imageContainer}>
				<Image
					src="https://source.unsplash.com/random"
					alt="user"
					width="100%"
					height="100%"
					layout="responsive"
					objectFit="cover"
					placeholder="blur"
					blurDataURL="https://source.unsplash.com/random"
				/>
			</Box>
		</Container>
	);
};

export default NumberOfUsers;
