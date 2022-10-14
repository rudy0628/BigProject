import { makeStyles } from '@mui/styles';

const useMainNavStyles = makeStyles((theme: any) => ({
	navbar: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
		color: '#333',
		padding: '1rem 0',
	},
	container: {
		display: 'flex',
		alignItems: 'Center',
		justifyContent: 'space-between',
	},
	toolbar: {
		gap: '2rem',
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	list: {
		width: '300px',
	},
	navIcon: {
		color: theme.palette.primary.main,
	},
	closeBtn: {
		width: '50px',
		height: '50px',
		margin: '10px 0 0 10px',
	},
	sidebarBtn: {
		textAlign: 'center',
		background: theme.palette.primary.main,
		borderRadius: '9px',
		color: '#fff',
		'&:hover': {
			background: theme.palette.primary.dark,
			color: '#fff',
		},
	},
	menuBtn: {
		display: 'none',
		[theme.breakpoints.down('md')]: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
}));

export default useMainNavStyles;
