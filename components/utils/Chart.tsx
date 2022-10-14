import React from 'react';
import { Box, Typography } from '@mui/material';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import NoResults from './NoResults';

import useMovementStyles from '../../styles/movement';

import { Movement } from '../../type';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
	movements: Movement[];
	type: string;
}

const Chart = ({ movements, type }: IProps) => {
	const classes = useMovementStyles();

	let chartData = [0, 0, 0];
	for (const movement of movements) {
		if (movement.totalPrice >= 0 && movement.totalPrice <= 5000) {
			chartData[0]++;
		} else if (movement.totalPrice >= 5001 && movement.totalPrice <= 30000) {
			chartData[1]++;
		} else if (movement.totalPrice >= 30001) {
			chartData[2]++;
		}
	}

	const data = {
		labels: [
			'低（金額低於 5000 ）',
			'中（金額 5000 至 30000）',
			'高（金額高於 30001）',
		],
		datasets: [
			{
				label: '# of Votes',
				data: chartData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<Box className={classes.chartContainer}>
			<Typography textAlign="center" marginBottom={1}>
				{type} 消費金額
			</Typography>
			{(movements.length === 0 || !movements) && (
				<NoResults text="沒有任何消費紀錄" />
			)}
			{movements.length > 0 && <Doughnut data={data} />}
		</Box>
	);
};

export default Chart;
