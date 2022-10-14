import { makeStyles } from '@mui/styles';

const useCardsStyles = makeStyles((theme: any) => ({
	container: {
		margin: '8rem auto',
	},
	card: {
		height: '100%',
		padding: '2rem',
	},
	icon: {
		padding: '1rem',
		fontSize: '4rem',
		backgroundColor: '#0288d1',
		color: '#fff',
		borderRadius: '50%',
	},
}));

export default useCardsStyles;
