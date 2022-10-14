import { makeStyles } from '@mui/styles';

const useIntroduceStyles = makeStyles((theme: any) => ({
	introduceContainer: {
		margin: '8rem auto',
	},
	title: {
		fontWeight: '700',
		textAlign: 'center',
	},
	text: {
		marginTop: '1rem',
		fontWeight: '400',
		color: '#777',
		textAlign: 'center',
	},
	cardContainer: {
		display: 'flex',
		gap: '2rem',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '3rem',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	card: {
		display: 'flex',
		gap: '1rem',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardIcon: {
		backgroundColor: '#e3f2fd',
		padding: '0.8rem',
		fontSize: '3.6rem',
		color: '#0288d1',
		borderRadius: '50%',
	},
}));

export default useIntroduceStyles;
