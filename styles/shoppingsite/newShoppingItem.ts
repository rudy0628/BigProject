import { makeStyles } from '@mui/styles';

const useNewShoppingItemStyle = makeStyles((theme: any) => ({
	formContainer: {
		width: '50%',
		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
	},
	btnContainer: {
		display: 'flex',
		gap: '1rem',
		margin: '0.5rem',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
}));

export default useNewShoppingItemStyle;
