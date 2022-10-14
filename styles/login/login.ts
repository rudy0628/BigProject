import { makeStyles } from '@mui/styles';

const useLoginStyles = makeStyles((theme: any) => ({
	container: {
		width: '100vw',
		height: '100vh',
		margin: '0',
		padding: '0',
	},
	imageGrid: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	loginContainer: {
		padding: '8rem 4rem',
		display: 'flex',
		gap: '1rem',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		height: '100vh',
	},
	lockIcon: {
		backgroundColor: theme.palette.secondary.main,
	},
	linkContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
}));

export default useLoginStyles;
