import { makeStyles } from '@mui/styles';

const useShoppingCartStyles = makeStyles((theme: any) => ({
	cartContainer: {
		width: '600px',
		[theme.breakpoints.down('md')]: {
			width: '400px',
		},
		[theme.breakpoints.down('sm')]: {
			width: '300px',
		},
	},
	shoppingCartItem: {
		border: '2px solid #bbb',
		borderRadius: '10px',
		padding: '0.5rem',
		display: 'flex',
		gap: '1rem',
		position: 'relative',
		margin: '0 0 1rem',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	shoppingCartImage: {
		borderRadius: '10px',
		overflow: 'hidden',
		width: '7.8rem',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			height: '15rem',
		},
		[theme.breakpoints.down('sm')]: {
			height: '10rem',
		},
	},
	textBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: 1,
	},
	btnGroup: {
		display: 'flex',
		gap: '1rem',
		marginTop: 'auto',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			gap: '0.5rem',
			alignItems: 'flex-start',
		},
	},
	modifyAmountBox: {
		display: 'flex',
		gap: '1rem',
		alignItems: 'center',
	},
	amount: {
		marginLeft: 'auto',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
}));

export default useShoppingCartStyles;
