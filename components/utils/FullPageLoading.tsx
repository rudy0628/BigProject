import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const FullPageLoading = ({ open }: { open: boolean }) => {
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default FullPageLoading;
