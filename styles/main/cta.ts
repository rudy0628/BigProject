import { makeStyles } from '@mui/styles';

const useCtaStyles = makeStyles((theme: any) => ({
	container: {
		margin: '8rem auto',
	},
	buttonGroup: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1rem',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			width: '100%',
		},
	},
}));

export default useCtaStyles;
