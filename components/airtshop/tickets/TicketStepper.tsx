import React from 'react';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import { stepLabel } from '../../../utility/data/airtshopData';

import useUiStore from '../../../store/uiStore';

interface IProps {
	activeStep: number;
}

const TicketStepper = ({ activeStep }: IProps) => {
	const { isDarkMode } = useUiStore();

	return (
		<Container
			maxWidth="md"
			sx={{
				position: 'absolute',
				top: '15%',
				left: '50%',
				zIndex: '1000',
				transform: 'translateX(-50%)',
				backgroundColor: isDarkMode ? '#111' : '#fff',
				padding: '1rem',
				borderRadius: '10px',
			}}
		>
			<Stepper nonLinear activeStep={activeStep}>
				{stepLabel.map(label => (
					<Step key={label}>
						<StepLabel color="inherit">{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Container>
	);
};

export default TicketStepper;
