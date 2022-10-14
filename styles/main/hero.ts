import { makeStyles } from '@mui/styles';

const useHeroStyles = makeStyles((theme: any) => ({
	heroContainer: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row',
		},
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		flex: '1',
		[theme.breakpoints.down('md')]: {
			marginTop: '2rem',
		},
	},
	title: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
	},
	imageContainer: {
		overflow: 'auto',
		flex: '1',
		[theme.breakpoints.up('md')]: {
			overflow: 'hidden',
		},
	},
	highlightText: {
		color: theme.palette.primary.dark,
		fontSize: '3rem',
	},
	subTitle: {
		color: '#777',
		letterSpacing: '2px',
	},
	buttonGroup: {
		display: 'flex',
		gap: '1rem',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			width: '100%',
		},
	},
	imageList: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
			transform: 'translateY(30px) translateX(100px) rotate(-18deg)',
		},
	},
}));

export default useHeroStyles;
