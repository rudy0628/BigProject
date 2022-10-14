import React from 'react';
import { Grid, Typography, Container, Card } from '@mui/material';
import useCardsStyles from '../../styles/main/cards';
import { cardData } from '../../utility/data/mainPageData';

const Cards = () => {
	const classes = useCardsStyles();

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container spacing={2}>
				{cardData.map((card, i) => (
					<Grid item xs={12} sm={6} lg={4} key={i}>
						<Card className={classes.card}>
							<card.icon className={classes.icon} />
							<Typography variant="h5" marginTop={2} fontWeight={700}>
								{card.title}
							</Typography>
							<Typography variant="h6" marginTop={2} color="#777">
								{card.text}
							</Typography>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Cards;
