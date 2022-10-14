import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import useCtaStyles from '../../styles/main/cta';

const Cta = () => {
	const classes = useCtaStyles();

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Typography variant="h3" letterSpacing={2} textAlign="center">
				立即開始使用BigProject
			</Typography>
			<Typography variant="h5" color="#777" marginTop={2} textAlign="center">
				購買任何商品、訂購任何機票、交流任何訊息在Big Project
			</Typography>
			<Box className={classes.buttonGroup} mt={3}>
				<Button size="large" variant="contained">
					馬上開始
				</Button>
				<Button variant="outlined" size="large">
					查看更多
				</Button>
			</Box>
		</Container>
	);
};

export default Cta;
