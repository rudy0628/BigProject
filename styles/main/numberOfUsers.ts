import { makeStyles } from '@mui/styles';

const useNumberOfUsersStyles = makeStyles((theme: any) => ({
	container: {
		display: 'flex',
		margin: '8rem auto',
		gap: '2rem',
	},
	textContainer: {
		flex: '1',
	},
	imageContainer: {
		flex: '1',
		height: '23rem',
		overflow: 'hidden',
		borderRadius: '10px',
		[theme.breakpoints.down('lg')]: {
			display: 'none',
		},
	},
	cardContainer: {
		display: 'flex',
		gap: '2rem',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
}));

export default useNumberOfUsersStyles;
