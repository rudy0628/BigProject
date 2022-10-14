import { makeStyles } from '@mui/styles';

const useMovementStyles = makeStyles((theme: any) => ({
	// index
	movementsBox: {
		[theme.breakpoints.down('md')]: {
			paddingLeft: '3.2rem',
		},
	},
	// movement sidebar
	movementSideBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		paddingRight: '1rem',
	},
	movementButtonBox: {
		display: 'flex',
		gap: '1rem',
		flexWrap: 'wrap',
	},
	movementUserBox: {
		display: 'flex',
		gap: '1rem',
		alignItems: 'center',
		padding: '0.5rem',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eee',
			borderRadius: '10px',
		},
	},
	movementSideLink: {
		cursor: 'pointer',
		color: '#777',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	// movement
	movementBox: {
		border: '1px solid #777',
		padding: '1rem',
		borderRadius: '7px',
		marginBottom: '1rem',
	},
	movementTitleBox: {
		display: 'flex',
		gap: '1rem',
		alignItems: 'center',
		cursor: 'pointer',
	},
	// user movements
	chartContainer: {
		width: '40%',
		margin: '0 auto',
		[theme.breakpoints.down('md')]: {
			width: '60%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
	},
}));

export default useMovementStyles;
