import { makeStyles } from '@mui/styles';

const useShoppingCommentsStyles = makeStyles((theme: any) => ({
	commentsContainer: {
		display: 'flex',
		gap: '1.5rem',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
}));

export default useShoppingCommentsStyles;
