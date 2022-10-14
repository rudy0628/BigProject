import { makeStyles } from '@mui/styles';

const useAirtshopStyles = makeStyles((theme: any) => ({
	// ticket form
	airtshopImage: {
		height: '55vh',
		[theme.breakpoints.down('sm')]: {
			height: '100vh',
		},
	},
	airtshopFormBox: {
		maxWidth: '50rem',
		width: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
		borderRadius: 2,
		padding: '1rem',
		[theme.breakpoints.down('lg')]: {
			maxWidth: '40rem',
		},
		[theme.breakpoints.down('md')]: {
			maxWidth: '30rem',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '20rem',
			top: '55%',
		},
	},
	InputBox: {
		display: 'flex',
		gap: '1rem',
		marginTop: '1rem',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	buttonBox: {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		marginTop: '1rem',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	// tickets
	ticketDetailBox: {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		border: '1px solid #ccc',
		borderRadius: '10px',
		padding: '1rem',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	detailLeftBox: {
		display: 'flex',
		gap: '1rem',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			justifyContent: 'space-between',
		},
	},
	detailRightBox: {
		display: 'flex',
		gap: '1rem',
		flex: 1,
		width: '100%',
	},
	dateBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	flightBox: {
		display: 'flex',
		flexDirection: 'column',
	},
	durationBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.3rem',
		flex: 1,
	},
	subHeaderBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	// ticket cart
	cartItemDetailBox: {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
	},
}));

export default useAirtshopStyles;
